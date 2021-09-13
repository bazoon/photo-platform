import { createMachine, assign, actions } from "xstate";

export default function({ context = {}, guards, services, actions } = {}) {
  return createMachine({
    initial: "idle",
    context,
    states: {
      idle: {
        on: {
          checkLogin: {
            target: "checkingLogin",
            actions: "loadLocalUser"
          },
          login: "loginIn",
          signup: {
            target: "signingUp",
            actions: "saveUser"
          },
          confirmEmail: "confirmingEmail"
        }
      },
      checkingLogin: {
        invoke: {
          src: "checkLogin",
          onDone: [
            {
              cond: "isLoggedIn",
              target: "loggedIn",
              actions: "storeLoggedIn"
            },
            {
              target: "idle"
            }
          ],
          onError: {
            target: "idle",
            actions: "visitMainPage"
          }
        }
      },
      waitingConfirm: {
        on: {
          confirm: "loggedIn"
        }
      },
      confirmingEmail: {
        invoke: {
          src: "confirmEmail",
          onDone: {
            target: "loggedIn",
            actions: "saveUser"
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
      signingUp: {
        invoke: {
          src: "signup",
          onDone: {
            target: "waitingConfirm",
            actions: "successSignup"
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
      loginIn: {
        invoke: {
          src: "login",
          onDone: {
            target: "loggedIn",
            actions: [
              "saveUser"
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
              target: "done",
              actions: [
                "saveRole"
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
      done: {
        entry: ["visitMainPage"]    
      }
    }
  }, 
  {
    actions,
    guards,
    services,
  });
}






