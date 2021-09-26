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
          loadImages: "loadImages",
          addImages: {
            actions: assign({
              sections: ({sections}, {files, id}) => services.addFilesToSection({sections, files, id})
            })
          },
          updateImage: {
            actions: assign({
              sections: ({sections}, data) => services.updateImage({sections}, data)
            })
          },
          replaceImage: {
            actions: assign({
              sections: ({sections}, data) => services.replaceImage({sections}, data)
            })
          },
          removeImage: "removeImage"
        }
      },
      removeImage: {
        invoke: {
          src: "removeRemoteImage",
          onDone: {
            target: "idle",
            actions: assign({
              sections: ({sections}, {data}) => services.removeImage({sections}, data)
            })
          },
          onError: {
            target: "idle"
          }
        }
      },
      loadImages: {
        invoke: {
          src: "loadImages",
          onDone: {
            target: "idle",
            actions: assign({
                sections: (_ , {data}) => data
              })
            }
          },
          onError: {
            target: "idle"
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
            target: "idle"
          }
        }
      }
    }
  }, {
    services,
  });
}
