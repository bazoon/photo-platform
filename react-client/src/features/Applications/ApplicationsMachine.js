import { createMachine, assign } from "xstate";
import {asyncGet, asyncPost} from "../../core/api";
import {over, view, pathLens} from "lodash-lens";
import {keys} from "lodash/fp";

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



export default function applicationsMachine({ context = {}, api } = {}) {
  return createMachine({
    initial: "initial",
    context,
    states: {
      initial: {
        on: {
          open: {
            target: "opened",
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
              cond: (_, {data}) => { return view(pathLens("[0].regState"), data) === 1; },
              target: "initial",
              actions: ["approve"],
            },
            {
              cond: (_, {applications}) => view(pathLens("[0].regState"), applications) === 3,
              target: "initial",
              actions: ["decline"],
            }
          ]
        }
      },
      loadingFailed: {

      },
      opened: {
        on: {
          choose: {
            actions: assign({
              files: ({files}, data) => [...files, ...data.files]
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
          selectSection: {
            actions: ["selectSection"]
          }
        }
      },
      sending: {
        on: {
          sendingOk: {
            target: "initial",
            actions: ["closeWindow", "clear"]
          },
          sendingFail: {
            target: "opened",
            actions: ["closeWindow"]
          }
        },
        invoke: {
          id: "sending",
          src: "sendFiles"
        },
      },
    }
  }, 
  {
    actions: {
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
      approve: assign({
        isApproved: true,
        applicationMessage: "Заявка одобрена"
      }),
      decline: assign({
        isApproved: false,
        applicationMessage: "Заявка отклонена"
      }),
      selectSection: assign({
        sectionId: (_, {sectionId}) => sectionId
      })
    },
    services: {
      sendFiles: ({files, sectionId}) =>callback => asyncPost(`api/${api}`, preparePayload({files, sectionId}), false)
        .fork(failed("sendingFailed", callback), ok({state: "sendingOk", callback, failedState: "sendingFailed"})),
    }
  });
}