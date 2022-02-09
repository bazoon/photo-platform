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
import identity from "crocks/combinators/identity";
import {isObject, mapValues} from "lodash/fp";

const safe = pred =>
  ifElse(pred, Just, Nothing);

const toFormData = (obj) => {
  const formData = new FormData;
  for (let key in obj) {
    formData.append(key, obj[key]);
  }
  return formData;
};

const normalizeDates = (values, {properties}) => {
  return Object.keys(values).reduce((a, k) => {
    let value = values[k];
    const isDate = properties[k]?.type === "date";
    return {...a, [k]: isDate? new Date(value) : value};
  }, {});
};

const fake = recs => recs.reduce((a, e) => [...a, e, {...e, id: e.id + Math.random()}] , []);
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
    dialogTitle: "",
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

export default ({name = "crud", api, idField = "id", apiParams, t = identity, apiMetaParams = {}}) => {
  
  const formatError = (e) => {
    if (isObject(e)) {
      return t(e.message) || t(e.error) || t(e.errorMessage) || e?.errors?.map(e => t(e)).join(" ");
    }
  };

  return Machine({
    id: name,
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
            actions: assign({ isOpen: true, dialogTitle: t("add") })
          },
          edit: {
            target: "opened.edit",
            actions: assign({ isOpen: true, record: (_, record) => { return record;}, dialogTitle: t("edit") })
          },
          remove: {
            target: "remove"
          },
          refresh: {
            actions: assign({
              records: ({records}, {records: recs}) => {
                return [...(recs || records)];
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
            Async.all([asyncGet(combineApiWithParams(api)(apiParams)), asyncGet(api + "/meta", apiMetaParams)]).fork(() => callback("loadFailed"), data => {
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
                target: `#${name}.idle`,
              },
              save: {
                actions: assign({
                  error: "",
                  record: (_, {data}) => data
                }),
                target: "post"
              }
            }
          },
          edit: {
            on: {
              close: {
                target: `#${name}.idle`
              },
              save: {
                target: "update",
              },
            },
          },
          post: {
            invoke: {
              id: "post",
              src: ({meta}, {data: rawData}) => (callback) => {
                const record = rawData;
                const hasFile = values(record).some(v => v instanceof File);
                const payload = hasFile ? toFormData(record) : record;
                const isJson = !hasFile;
                asyncPost(combineApiWithParams(api)(apiParams), payload, isJson).fork(e => callback({type: "postFailed", error: e}), data => {
                  callback({type: "saveOk", data});
                });
              }
            }
          },
          update: {
            invoke: {
              id: "update",
              src: ({meta}, {data}) => (callback) => {
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
                target: `#${name}.idle`
              }
            }
          }
        },
        on: {
          saveFailed: {
            actions: assign({
              error: (_, data) => ({message: "Ошибка сохранения: " + formatError(data?.error), data})
            }),
            target: "opened.saveFailed"
          },
          postFailed: {
            actions: assign({
              error: (_, {error}) => ({message: "Ошибка сохранения: " + formatError(error), error})
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
                return records.map(r => r[idField] == data[idField] ? ({...r, ...data}) : r);
              }
            })
          },
          updateRecord: {
            actions: assign({
              record: ({record}, data) => ({...record, ...data.record})
            })
          }
        }
      },


    }
  });};
