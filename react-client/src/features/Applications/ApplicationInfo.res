@module("react-i18next") external useTranslation: string => 'a = "useTranslation"
/* @module("primereact/button") external Button: string => React.element = "Button" */

module Button = {
  @react.component @module("primereact/button")
  external make: (~children: React.element, ~onClick: unit => unit) => React.element = "Button"
}

// Bindings.res
/* module Button = { */
/* @module("primereact/button") @react.component */
/* external make: (~children: React.element, ~onClick: unit => unit) => React.element = "default" */
/* } */

@react.component
let make = (~contestName, ~status: string, ~dateReg: Js.Nullable.t<string>, ~openUpload, ~canUpload: bool) => {
  /* let [t, _, _] = useTranslation("namespace1") */
  let t = switch useTranslation("namespace1") {
  | [t, _, _] => a => t(a, "")
  | _ => (a: string) => a
  }

  let date = switch Js.Nullable.toOption(dateReg) {
   | Some(d) => Js.Date.toLocaleDateString(Js.Date.fromString(d))
   | _ => ""
  }

    <div className="grid grid-cols-2 m-auto w-3/5 text-base items-baseline">
      <div> {React.string(t("currentContest"))} </div>
      <div className="uppercase text-lg text-brown-light2 font-header">
        {React.string(contestName)}
      </div>
      <div> {React.string(t("status"))} </div>
      <div> {React.string(status)} </div>
      <div> {React.string(t("dateReg"))} </div>
      <div> {React.string(date)} </div>
      <div className="mt-10" />
      <div className="mt-10">
        {switch canUpload {
        | true => <Button onClick={openUpload}> {React.string(t("uploadPhoto"))} </Button>
        | false => <div />
        }}
      </div>
    
  </div>
}
