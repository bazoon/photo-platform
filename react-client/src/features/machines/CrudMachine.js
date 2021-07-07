import {Machine, assign} from "xstate";
import compose from "lodash/fp/compose";
import keys from "lodash/fp/keys";
import join from "lodash/fp/join";
import {asyncGet, asyncPost, asyncPut, asyncDel} from "../../core/api";
import Async from "crocks/Async";
import values from "lodash/fp/values";
import {ifElse} from "crocks";
import {option, map} from "crocks/pointfree";
import {Just, Nothing} from "crocks/Maybe";

const safe = pred =>
  ifElse(pred, Just, Nothing);

const toFormData = (obj) => {
  const formData = new FormData;
  for (let key in obj) {
    formData.append(key, obj[key]);
  }
  return formData;
};

const log = x => { x.inspect ? console.log(x.inspect()) : console.log(x); return x; };

const combineApiWithParams = api => (params = {}) => compose(
  option(api),
  map(s => api + "/" + s),
  map(join("/")),
  map(values),
  safe(p => keys(p).length > 0),
)(params);

const getInitialContext = () => {
  return {
    isOpen: false,
    error: "",
    changed: false,
    record: {},
    records: [],
    meta: {
      columns: [],
      fields: []
    }
  };
};

export default ({api, idField = "id", apiParams}) => {
  return Machine({
    id: "crud",
    context: getInitialContext(),
    initial: "idle",
    states: {
      idle: {
        entry: assign({isOpen: false, error: "", record: {}}),
        on: {
          load: {
            target: "loading",
            actions: assign({loading: true})
          },
          add: {
            target: "opened.add",
            actions: assign({ isOpen: true})
          },
          edit: {
            target: "opened.edit",
            actions: assign({ isOpen: true, record: (_, record) => { return record;} })
          },
          remove: {
            target: "remove"
          },
          refresh: {
            actions: assign({
              records: ({records}) => {
                return [...records];
              }
            }),
          }
        },
      },
      remove: {
        invoke: {
          id: "removeRecord",
          src: (_, {id}) => (callback) => {
            asyncDel(api + "/" + id).fork(() => callback("removeFailed"), () => callback({type: "removeOk",  id}));
          }
        },
        on: {
          removeFailed: {
            target: "idle"
          },
          removeOk: {
            actions: assign({
              records: ({records}, {id}) => {
                return records.filter(r => r[idField] !== id);
              }
            }),
            target: "idle"
          }
        }
      },
      loading: {
        invoke: {
          id: "loadGrid",
          src: () => (callback) => {
            Async.all([asyncGet(combineApiWithParams(api)(apiParams)), asyncGet(api + "/meta")]) .fork(() => callback("loadFailed"), data => {
              callback({type: "loadOk", data});
            });
          }
        },
        on: {
          loadOk: {
            actions: assign({
              records: (_, {data}) => data[0],
              meta: (_, {data}) => data[1]
            }),
            target: "idle"
          },
          loadFailed: {
            target: "loadFailed"
          }
        }
      },
      loadFailed: {

      },
      cleared: {
        entry: assign(getInitialContext()),
        always: {
          target: "idle"
        }
      },
      opened: {
        states: {
          add: {
            on: {
              close: {
                target: "#crud.idle",
              },
              save: {
                actions: assign({
                  error: "",
                  record: (_, record) => {
                    // console.log(record);

                  }
                }),
                target: "post"
              }
            }
          },
          edit: {
            on: {
              close: {
                target: "#crud.idle"
              },
              save: {
                target: "update",
              },
            },
          },
          post: {
            invoke: {
              id: "post",
              src: (_, {data: record}) => (callback) => {
                const hasFile = values(record).some(v => v instanceof File);
                const payload = hasFile ? toFormData(record) : record;
                const isJson = !hasFile;
                asyncPost(combineApiWithParams(api)(apiParams), payload, isJson).fork(() => callback("postFailed"), data => {
                  callback({type: "saveOk", data});
                });
              }
            }
          },
          update: {
            invoke: {
              id: "update",
              src: (_, {data}) => (callback) => {
                const hasFile = values(data).some(v => v instanceof File);
                const payload = hasFile ? toFormData(data) : data;
                const isJson = !hasFile;
                asyncPut(api + "/" + data[idField], payload, isJson).fork(e => callback({type: "saveFailed", e}), data => {
                  callback({type: "updateOk", data});
                });
              }
            }
          },
          saveFailed: {
            on: {
              save: {
                target: "update"
              },
              close: {
                target: "#crud.idle"
              }
            }
          }
        },
        on: {
          saveFailed: {
            actions: assign({
              error: (_, data) => ({message: "Ошибка сохранения", data})
            }),
            target: "opened.saveFailed"
          },
          postFailed: {
            actions: assign({
              error: (_, data) => ({message: "Ошибка сохранения", data})
            }),
            target: "opened.add"
          },
          saveOk: {
            target: "idle",
            actions: assign({
              records: ({records}, {data}) => {
                return [data,...records];
              }
            })
          },
          updateOk: {
            target: "idle",
            actions: assign({
              records: ({records}, {data}) => {
                // тут бывают строковые id поэтому ==
                return records.map(r => r[idField] == data[idField] ? data : r);
              }
            })
          },
          updateRecord: {
            actions: assign({
              record: (_, {record}) => record
            })
          }
        }
      },


    }
  });};
