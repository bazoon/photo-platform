import { createMachine, assign } from "xstate";

export default function({ context = {}, services } = {}) {
  return createMachine({
    initial: "idle",
    context,
    states: {
      idle: {
        on: {
          load: "loading"
        }
      },
      loading: {
        on: {
          loadingOk: {
            target: "idle",
            actions: [
              assign({
                data: (context, event) => { console.log(event.data); return event.data; }
              })
            ]
          },
          loadingFailed: {
            target: "idle",
            actions: [
              assign({
                error: (context, event) => event.data
              })
            ]
          }
        },
        invoke: {
          src: "getSections",
          onDone: {
            actions: [
              assign({
                users: (context, event) => event.data
              })
            ]
          }
        }
      }
    }
  }, {
    services: {
      getSections: services.getSections
    }
  });
}
