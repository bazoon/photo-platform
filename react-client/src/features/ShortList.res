@module("react-i18next") external useTranslation: string => 'a = "useTranslation"

type asyncErr = unit => unit
type cleanUp = unit => unit
type asyncOk<'t> = 't => unit
type forkT<'t> = (asyncErr, asyncOk<'t>, cleanUp) => unit

type async<'t> = {fork: forkT<'t>}

type juryStat = {
  name: string,
  all: int,
  done: int,
}

type juryStats = array<juryStat>

type contestInfo = {
  name: string,
  salone: string,
}

type store = {info: option<contestInfo>}

type image = {
  id: string,
  description: string,
  filename: string,
  name: string,
  place: string,
  year: string,
  rate: int,
  mean: float,
  median: float,
  count: int,
  email: string,
  author: string
}

type images = array<image>

type section = {
  id: string,
  name: string,
  images: images,
}

type sectionsPayload = array<section>

@module("../core/api.js") external asyncGet: string => async<'a> = "asyncGet"
@module("../core/api.js") external asyncGetCan: string => async<'a> = "asyncGet"
@module("react-recollect") external store: store = "store"

@module("../core/api.js") external asyncGetSections: string => async<sectionsPayload> = "asyncGet"
@module("../core/api.js") external asyncGetImages: string => async<images> = "asyncGet"

module ProfileMenu = {
  @react.component @module("./ProfileMenu.js")
  external make: unit => React.element = "ProfileMenu"
}

module Link = {
  @react.component @module("react-router-dom")
  external make: (~to: string, ~className: string, ~children: React.element) => React.element =
    "Link"
}

@react.component
let make = (~id: string) => {
  let t = switch useTranslation("namespace1") {
  | [t, _, _] => a => t(a, a)
  | _ => (a: string) => a
  }

  let (sections, setSections) = React.useState(_ => [])
  let (images, setImages) = React.useState(_ => [])
  let (section, setSection) = React.useState(_ => None)
  let (imageIndex, setImageIndex) = React.useState(_ => 0)

  let cleanUp = () => ()
  let failed = () => ()

  let okImages = images => {
    setImages(_ => images)
    ()
  }

  let loadSection = (s: option<section>) => {
    let id = switch s {
    | None => ""
    | Some(sec) => sec.id
    }
    setSection(_ => s)
    asyncGetImages(`api/jury/shortList/${id}`).fork(failed, okImages, cleanUp)
  }

  let sectionsOk = data => {
    setSections(_ => data)
    let s = data->Belt.Array.get(0)
    loadSection(s)
    ()
  }

  let loadSections = () => {
    asyncGetSections("api/jury/sections").fork(failed, sectionsOk, cleanUp)
    ()
  }

  let move = (dir: int) => {
    setSections((s: array<section>) => {
      setImageIndex(old => {
        let newIndex = mod(Js.Math.abs_int(old + dir), s->Belt.Array.length)
        let newSection = s->Belt.Array.get(newIndex)
        setSection(_ => newSection)
        loadSection(newSection)
        newIndex
      })
      s
    })
  }

  React.useEffect0(() => {
    loadSections()
    None
  })

  let renderThumb = (image: image) => {
    let cls = "object-contain h-full"
    <div className="grid grid-cols-2 gap-10">
      <div className="w-auto h-52 justify-end flex">
        <img src={image.filename} className={cls} />
      </div>
      <div className="h-52 cursor-pointer flex-shrink-0 flex-grow-0 flex-col flex">
        <span className="text-sm-2"> {React.string(image.name)} </span>
        <span className="text-sm-2"> {React.string(image.author)} </span>
        <span className="text-sm-2"> {React.string(image.email)} </span>
        <span className="text-sm-2">
          {React.string(t("mean") ++ " - " ++ Belt.Float.toString(image.mean))}
        </span>
        <span className="text-sm-2">
          {React.string(t("median") ++ " - " ++ Belt.Float.toString(image.median))}
        </span>
        <span className="text-sm-2">
          {React.string(t("count") ++ " - " ++ Belt.Int.toString(image.count))}
        </span>
      </div>
    </div>
  }

  let renderThumbs = (images: array<image>) => {
    <div className="grid grid-cols-1 gap-5 m-auto text-base items-baseline">
      {images->Belt.Array.map(renderThumb)->React.array}
    </div>
  }

  let renderSection = (s: option<section>) => {
    switch s {
    | Some(section) =>
      <div className="flex items-center justify-between w-4/5">
        <div className="mr-20 cursor-pointer text-3xl" onClick={_ => move(-1)}> {"<"->React.string} </div>
        <div className="text-2xl w-3/5 text-center"> {React.string(section.name)} </div>
        <div className="ml-20 cursor-pointer text-3xl" onClick={_ => move(1)}> {">"->React.string} </div>
      </div>

    | None => <> </>
    }
  }

  <div className="relative flex flex-col items-center flex-1 w-full">
    <div className="uppercase text-semi-bright mb-5 text-4xl text-center mt-10">
      {switch store.info {
      | Some(i) => React.string(i.salone)
      | None => <> </>
      }}
    </div>
    <div className="uppercase text-semi-bright mb-10 text-3xl text-center">
      {switch store.info {
      | Some(i) => React.string(i.name)
      | None => <> </>
      }}
    </div>
    <div className="mb-20 w-full flex justify-center"> {renderSection(section)} </div>
    <div className="mb-40"> {renderThumbs(images)} </div>
  </div>
}
