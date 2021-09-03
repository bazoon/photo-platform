import { createMachine, assign } from "xstate";

export default function({ context = {}, guards, services } = {}) {
  return createMachine({
    initial: "idle",
    context,
    states: {
      idle: {
        on: {
          login: "loginIn",
          signup: "watingConfirm"
        }
      },
      watingConfirm: {
        on: {
          confirm: "loggedIn"
        }
      },
      loginIn: {
        invoke: {
          src: "login",
          onDone: {
            target: "loggedIn",
            actions: [
              assign({
                user: (_, event) => event?.data
              })
            ]
          },
          onError: {
            target: "idle",
            actions: [
              assign({
                error: (_, event) => event?.data
              })
            ]
          }
        }
      },
      loggedIn: {
        invoke: {
          src: "loadRoles",
          onDone: [
            {
              cond: "hasAuth",
              target: "authorized",
              actions: [
                assign({
                  role: (_, {role}) => role
                })
              ]
            },
            {
              target: "done"
            }
          ],
          onError: {
            target: "idle"
          },
        }
      },
      authorized: {
        always: "done"
      },
      done: {

      }
    }
  }, 
  {
    guards: {
      hasAuth: guards.hasAuth
    },
    services: {
      login: services.login,
      loadRoles: services.loadRoles
    } 
  });
}






