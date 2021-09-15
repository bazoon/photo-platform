import { createMachine, assign } from "xstate";
import {view, over, pathLens, findLens} from "lodash-lens";

export default function({ context = {}, services } = {}) {
  return createMachine({
    initial: "idle",
    context,
    states: {
      idle: {
        on: {
          load: "loading",
          loadImages: "loadImages"
        }
      },
      loading: {
        invoke: {
          src: "getSections",
          onDone: {
            target: "idle",
            actions: [
              assign({
                sections: (_, event) => event.data
              })
            ]
          },
          onError: {
          }
        }
      },
      loadImages: {
        invoke: {
          src: "loadImages",
          onDone: {
            // target: "idle",
            actions: assign({
              sections: ({sections}, {data}) => over(findLens({id: data.id}), section => ({...section, images: data.images}), sections)
            })
          }
        }
      }
    }
  }, {
    services
  });
}
