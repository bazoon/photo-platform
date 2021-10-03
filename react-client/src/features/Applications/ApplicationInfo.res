@module("react-i18next") external useTranslation: string => 'a = "useTranslation"
/* @module("primereact/button") external Button: string => React.element = "Button" */

module Button = {
  @react.component @module("primereact/button")
  external make: (~children: React.element, ~onClick: unit => unit, ~className: string) => React.element = "Button"
}

// Bindings.res
/* module Button = { */
/* @module("primereact/button") @react.component */
/* external make: (~children: React.element, ~onClick: unit => unit) => React.element = "default" */
/* } */

@react.component
let make = (~contestName, ~status: string, ~dateReg: Js.Nullable.t<string>, ~openUpload, ~canUpload: bool, ~rejectionReason: Js.Nullable.t<string>) => {
  let t = switch useTranslation("namespace1") {
  | [t, _, _] => a => t(a, "")
  | _ => (a: string) => a
  }

  let date = switch Js.Nullable.toOption(dateReg) {
   | Some(d) => Js.Date.toLocaleDateString(Js.Date.fromString(d))
   | _ => ""
  }

  let rr = switch Js.Nullable.toOption(rejectionReason) {
   | Some(d) => "(" ++ d ++ ")"
   | _ => ""
  }

    <div className="grid grid-cols-2 gap-5 gap-y-2 m-auto w-3/5 text-sm items-center">
      <span className="place-self-end"> {React.string(t("currentContest"))} </span>
      <span className="uppercase text-sm text-brown-light2 font-header">
        {React.string(contestName)}
      </span>
      <span className="place-self-end"> {React.string(t("status"))} </span>
      <span> { React.string(status) } </span>
      <span></span>
      <span className="text-xs">{React.string(rr)}</span>
      <span className="place-self-end"> {React.string(t("dateReg"))} </span>
      <span className=""> {React.string(date)} </span>
      <div className="mt-10" />
      <div className="mt-10">
        {switch canUpload {
        | true => <Button className="uppercase flex-shrink-0 flex-grow-0 w-40 flex justify-center p-5" onClick={openUpload}> {React.string(t("uploadPhoto"))} </Button>
        | false => <div />
        }}
      </div>
    
  </div>
}
