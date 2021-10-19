@module("react-i18next") external useTranslation: string => 'a = "useTranslation"


module ProfileMenu = {
  @react.component @module("./ProfileMenu.js")
  external make: () => React.element = "ProfileMenu"
}


@react.component
let make = (~id: string) => {
  let t = switch useTranslation("namespace1") {
    | [t, _, _] => a => t(a, a)
    | _ => (a: string) => a
  }

  /* let (selectedImage, setSelectedImage) = React.useState(_ => None); */



    <div className="container flex justify-center flex-1 bg-brown-dark2 text-semi-bright"> 
      <div className="relative flex justify-center flex-1">
        <div>
          <div className="uppercase text-4xl text-semi-bright font-header text-center mt-32">
          {React.string(t("jury-analytics"))}
          </div>
        </div>
      </div>
      <ProfileMenu/>
    </div>
}
