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
        invoke: {
          src: "getSections",
          onDone: {
            actions: [
              assign({
                sections: (_, event) => event.data
              })
            ]
          },
          onError: {
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
