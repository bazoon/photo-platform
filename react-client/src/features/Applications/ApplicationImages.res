@module("react-i18next") external useTranslation: string => 'a = "useTranslation"
@module("classnames") external cn: string => 'a = "default"



module Button = {
  @react.component @module("primereact/button")
  external make: (~children: React.element, ~onClick: unit => unit) => React.element = "Button"
}

type file = {name: string}

type photowork = Photowork({id: string, name: string, filename: string, year: string, place: string})

type applicationImage = 
  | Draft(file)
  | Uploaded(photowork)
  | NoImage


