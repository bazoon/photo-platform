import { createMachine, assign } from "xstate";
import {asyncGet, asyncPost, asyncDel} from "../../core/api";
import {over, view, pathLens} from "lodash-lens";
import {keys, get, omit} from "lodash/fp";

const sendFiles = files => {

};

const failed = (state, callback) => data => {
  callback({type: state, ...data});
};

const ok = ({state, callback, failedState, params = {}}) => data => {
  if (data.success === false) {
    callback({type: failedState, ...data, ...params});
  } else {
    callback({type: state, data});
  }
};

const prepareFiles = files => {
  const formData = new FormData();
  return files.reduce((a, file) => (a.append("files", file), a) , formData);
};


const preparePayload = data => {
  const d = keys(data).reduce((form, field) => {
    const value = data[field];
    return Array.isArray(value) ? (value.forEach(f => form.append(field, f)), form) : (form.append(field, data[field]), form);
  }, new FormData());
  return d;
};

const regStates = [
  "Подана",
  "Принята",
  "Ожидает оплаты",
  "Отклонена по неуплате",
  "Отклонена по другой причине",
  "Регистрация приостановлена",
  "Бан"
];

export default function applicationsMachine({ context = {}, api } = {}) {
  return createMachine({
    initial: "initial",
    context,
    states: {
      initial: {
        on: {
          loadPhotoworks: "loadingPhotoworks",
          open: {
            // target: "opened",
            actions: ["openWindow"]
          },
          load: {
            target: "loading"
          }
        }
      },
      loading: {
        invoke: {
          id: "loading",
          src: () => callback => asyncGet(`api/${api}`)
            .fork(failed("loadingFailed", callback), ok({state: "loadingOk", callback, failedState: "loadingFailed"})),
        },
        on: {
          loadingFailed: {
            target: "loadingFailed",
            actions: ["loadingFailed"]
          },
          loadingOk: [
            {
              cond: (_, {data}) => { return get("regState", data) === undefined;  },
              target: "noApplication",
            },
            {
              cond: (_, {data}) => { return get("regState", data) === 1;  },
              target: "hasApplication",
              actions: ["processApplication"]
            },
            {
              target: "hasApplication",
              actions: "processApplication"
            },
          ]
        }
      },
      noApplication: {
        on: {
          apply: "apply"
        } 
      },
      hasApplication: {
        invoke: {
          src: "loadingPhotoworks",
          onDone: {
            actions: "updatePhotoworks"
          }
        },
        on: {
          choose: {
            actions: assign({
              payload: ({payload}, data) => ({...payload, ...omit("type", data)})
            })
          },
          close: {
            target: "initial",
            actions: ["closeWindow", "clear"]
          },
          submit: {
            target: "sending",
            actions: ["sendFiles"]
          },
          remove: {
            target: "removing"
          }
        }
      },
      removing: {
        invoke: {
          src: "removeImages",
          onDone: {
            target: "hasApplication"
          }
        }
      },
      apply: {
        invoke: {
          id: "apply",
          src: "apply",
          onDone: {
            target: "loading",
            actions: assign({
              success: true
            })
          },
          onError: {
            target: "noApplication",
            actions: assign({
              success: false
            })
          }
        }
      },
      loadingFailed: {

      },
      sending: {
        on: {
          sendingOk: {
            target: "loadingPhotoworks",
            actions: ["clear"]
          },
          sendingFail: {
            // target: "opened",
            actions: ["closeWindow"]
          }
        },
        invoke: {
          id: "sending",
          src: "sendFiles"
        },
      },
      loadingPhotoworks: {
        invoke: {
          id: "loadingPhotoworks",
          src: "loadingPhotoworks"
        },
        on: {
          loadingPhotoworksOk: {
            target: "worksLoaded",
            actions: ["updatePhotoworks"]
          }
        }
      },
      loadingPhotoworksFailed: {},
      awaitingPayment: {},
      worksLoaded: {

      }
    }
  }, 
  {
    actions: {
      updatePhotoworks: assign({
        photoworks: (_, {data}) => data
      }),
      openWindow: assign({
        isOpen: true
      }),
      closeWindow: assign({
        isOpen: false
      }),
      sendFiles: assign({
        isSending: true
      }),
      clear: assign({
        files: []
      }),
      loadingOk: assign({
        applications: (_, {data}) => data,
      }),
      loadingFailed: assign({

      }),
      processApplication: assign({
        isApproved: (_, {data}) => data.regState === 1,
        applicationMessage: (_, {data}) => regStates[data.regState],
        application: (_, {data}) => data
      }),
    },
    services: {
      sendFiles: ({payload}) =>callback => asyncPost(`api/${api}`, preparePayload(payload), false)
        .fork(failed("sendingFailed", callback), ok({state: "sendingOk", callback, failedState: "sendingFailed"})),
      loadingPhotoworks: () => asyncGet("api/photoworks").toPromise(),
      apply: (_, {data}) => asyncPost("api/apply", data).toPromise(),
      removeImages: (_, {ids}) => { debugger; return asyncDel("api/photoworks", ids).toPromise(); }
    }
  });
}
