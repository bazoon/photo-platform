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


@react.component
let make = (~onSelect, ~images, ~className) => {
  let (selectedImage, setSelectedImage) = React.useState(_ => NoImage)

  let selectImage = image => {
    setSelectedImage(image);
    onSelect(image);
  }; 


  let im = React.array(Belt.Array.map(images, image => {
       // let cls = cn("object-cover w-full h-full", {"border-brown-light2 border-2 border-dotted": image === selectedImage });
        let src = switch image {
          | Draft(file) => file.name
          | Uploaded(Photowork({filename})) => filename
          | NoImage => ""
        }

         <div>
          <img src={src}/>
         </div>
      }))


  <div className={`flex gap-5 overflow-x-auto h-64 p-5 overflow-y-hidden hidden-scroll ${className}`}>
    {
      im
    }
  </div>

}

