@module("react-i18next") external useTranslation: string => 'a = "useTranslation"

type moderResult = Unseen | Approved | Declined

let valueToModerResult = (value: int) => switch value {
  | 0 => Unseen
  | 1 => Approved
  | 2 => Declined
  | _ => Unseen
}

type image = {
  id: string,
  description: string,
  filename: string,
  name: string,
  place: string,
  year: string,
  author: string,
  dateAdd: string,
  moder: int,
  moderResult: moderResult,
}

type images = array<image>

type section = {
  id: string,
  maxCountImg: int,
  name: string,
  images: images
}

type sectionsPayload = array<section>
type asyncErr = unit => unit
type cleanUp = unit => unit
type asyncOk<'t> = 't => unit
type forkT<'t> = (asyncErr, asyncOk<'t>, cleanUp) => unit

type async<'t> = {
  fork: forkT<'t>
}

type listOption = {
  label: string,
  value: string
}
type options = array<section>;

type eventWithValue = {
  value: Js.Nullable.t<section>
}

type contestInfo = {
  totalPhotoworks: string,
  subname: string
}

@module("../../../core/api.js") external asyncGetSections: string => async<sectionsPayload> = "asyncGet"
@module("../../../core/api.js") external asyncGetImages: string => async<images> = "asyncGet"
@module("../../../core/api.js") external asyncGetTotalPhotoworks: string => async<contestInfo> = "asyncGet"

module Button = {
  @react.component @module("primereact/button")
  external make: (~children: React.element, ~onClick: unit => unit, ~className: string) => React.element = "Button"

}
module RadioButton = {
  @react.component @module("primereact/radiobutton")
  external make: (~onChange: unit => unit, ~checked: bool, ~name: string) => React.element = "RadioButton"
}

module ListBox = {
  @react.component @module("primereact/listbox")
  external make: (
    ~options: array<section>, 
    ~optionLabel: string, 
    ~className: string, 
    ~optionsValue: string, 
    ~listClassName: string,
    ~value: 'a,
    ~onChange: eventWithValue => unit) => React.element = "ListBox"
}

let countByStatus = section => {
  let e = section.images -> Belt.Array.reduce((0, 0, 0), ((u, d, a), e) => {
    switch e.moderResult {
      | Unseen => (u + 1, d, a)
      | Declined => (u, d + 1, a)
      | Approved => (u, d, a + 1)
    }
  })
  Js.log2(section, e)
  e
}

@react.component
let make = (~id: string) => {
  let t = switch useTranslation("namespace1") {
    | [t, _, _] => a => t(a, a)
    | _ => (a: string) => a
  }
  
  let cleanUp = () => ()

  let (sections, setSections) = React.useState(_ => []);
  let (section, setSection) = React.useState(_ => None);
  let (selectedImage, setSelectedImage) = React.useState(_ => None);
  let (contestInfo, setContestInfo) = React.useState(_ => None)
  let (moderFilter, setModerFilter) = React.useState(_ => Unseen)


  let okImages = (s: option<section>) => data => {
    let id = switch s {
      | None => ""
      | Some(sec) => sec.id
    }
      
    let images = data -> Belt.Array.map(im => {...im, moderResult: valueToModerResult(im.moder)})

    setSections(sections => {
      let newSections = sections -> Belt.Array.map(x => x.id == id ? {...x, images} : x)
      Js.log2("setting", s)
      setSection(_ => newSections -> Belt.Array.getBy(e => e.id == id))
      setSelectedImage(_ => data -> Belt.Array.get(0))
      newSections
    })
    ()
  }


  let failed = () => {
    ()
  }

  let loadSection = (s: option<section>) => {
    let id = switch s {
      | None => ""
      | Some(sec) => sec.id
    }
    asyncGetImages(`api/sections/${id}/images`).fork(failed, okImages(s), cleanUp)
  }

  let selectSection = (e: eventWithValue) => {
    loadSection(Js.Nullable.toOption(e.value))
    ()
  }

  let ok = data => {
    setSections(_ => data)
    let s = data -> Belt.Array.get(0)
    loadSection(s);
    ()
  }

  let okContestInfo = a => {
    setContestInfo(_ => Some(a))
    ()
  }

  React.useEffect0(() => {
    asyncGetSections("api/sections").fork(failed, ok, cleanUp)
    asyncGetTotalPhotoworks(`api/admin/moder/stats/${id}`).fork(failed, okContestInfo, cleanUp)
    None
  })

  let selectImage = im => _ => {
    setSelectedImage(_ => Some(im));
  }

  let renderImage = (im: image) => {
    let basicCls = "w-52 h-52 cursor-pointer flex-shrink-0 flex-grow-0 pt-5";
    let selectedCls = basicCls ++ " border-0 border-t-2 border-coolGray-50 selected-image"

    let cls = switch (selectedImage) {
      | Some(img) => if im == img { selectedCls } else { basicCls }
      | None => basicCls
    }
  
    <div className={cls}>
      <img onClick={selectImage(im)} className="object-cover h-full w-full" src={im.filename} key={im.id} />
    </div>
  }


  let renderImages = (section, visibleModerResult) => {
    let visible = Js.Array.filter(im => im.moderResult == visibleModerResult, section.images)
      -> Belt.Array.map(renderImage)

    <div className={`flex gap-5 overflow-x-auto ml-5 mr-5 h-72 p-5 overflow-y-hidden hidden-scroll relative`}>
      {
        React.array(visible)
      }
    </div>
  }

  let renderInfo = (im: image) => {
    let tdCls = "p-5"
    <div>
      <table className="w-full">
        <colgroup>
          <col className="w-64"/>
          <col/>
        </colgroup>
        <tr>
          <td className={tdCls}>{React.string(t("name"))}</td>
          <td className={tdCls}>{React.string(im.name)}</td>
        </tr>
        <tr>
          <td className={tdCls}>{React.string(t("dateAdd"))}</td>
          <td className={tdCls}>{React.string(im.dateAdd)}</td>
        </tr>
        <tr>
          <td className={tdCls}>{React.string(t("year"))}</td>
          <td className={tdCls}>{React.string(im.year)}</td>
        </tr>
        <tr>
          <td className={tdCls}>{React.string(t("author"))}</td>
          <td className={tdCls}>{React.string(im.author)}</td>
        </tr>
        <tr>
          <td colSpan={2} className={tdCls}>{React.string(im.description)}</td>
        </tr>
      </table>
    </div>
  }

  let renderSections = (value: option<section>) => {
    <ListBox value={value} listClassName="h-full" className="h-full" options={sections} onChange={selectSection} optionLabel="name" optionsValue="id"/>
  }

  let renderStats = (section, contestInfo) => {
    let (unseen, declined, approved) = switch section {
      | None => (0, 0, 0)
      | Some(s) => countByStatus(s)
    }
    <div className="flex justify-around p-5">
      <div>
        {
          switch contestInfo {
            | None => React.string("")
            | Some(c) => <div>{React.string(t("totalPhotoworks"))} {React.string(c.totalPhotoworks)}</div>
          }
        }
      </div>
      <div>{React.string(t("unseen"))} {React.string(Belt.Int.toString(unseen))}</div>
      <div>{React.string(t("approved"))} {React.string(Belt.Int.toString(approved))}</div>
      <div>{React.string(t("declined"))} {React.string(Belt.Int.toString(declined))}</div>
    </div>
  }

  let handleFilter = mr => {
    setModerFilter(_ => mr)
    ()
  }

  let renderFilter = () => {
    <div className="flex justify-between w-1/2">
      <div>
        <label className="mr-5">{React.string(t("unseen"))}</label>
        <RadioButton checked={moderFilter == Unseen} name="radio" onChange={_ => handleFilter(Unseen)}/>
      </div>
      <div>
        <label className="mr-5">{React.string(t("approved"))}</label>
        <RadioButton checked={moderFilter == Approved} name="radio" onChange={_ => handleFilter(Approved)}/>
      </div>
      <div>
        <label className="mr-5">{React.string(t("declined"))}</label>
        <RadioButton checked={moderFilter == Declined} onChange={_ => handleFilter(Declined)} name="radio"/>
      </div>
    </div>
  }

  let approve = (im, section) => {
    switch (im, section) {
      | (Some(ima: image), Some(sec)) => setSections(sections => {
          let newImages = sec.images -> Belt.Array.map(x => x.id == ima.id ? {...x, moderResult: Approved} : x)
          let newSection = {...sec, images: newImages}
          let newSections = sections -> Belt.Array.map(x => x.id == sec.id ? newSection : x)
          setSection(_ => Some(newSection))
          newSections
        })
      | _ => ()
    }
  }

  let renderModerToolbar = (im: option<image>, section) => {
    <div>
      <Button className="" onClick={_ => approve(im, section)}> {React.string(t("approve"))} </Button>
    </div>
  }

  <div>
    {renderStats(section, contestInfo)}
    <div className="grid grid-cols-12 h-full p-5 gap-5">
    <div className="col-span-4 row-span-3 h-full">
      {
        renderSections(section)
      }
    </div>

    <div className="col-span-8">
      {renderFilter()}
    </div>

    <div className="col-span-8 h-full">
      {
        switch section {
          | None => <div/>
          | Some(section) => renderImages(section, moderFilter)
        }
      }
    </div>
      
    <div className="col-span-8">
    {
      switch selectedImage {
        | None => <div/>
        | Some(im) => renderInfo(im)
      }
    }
    </div>
    <div className="col-span-8">
      {renderModerToolbar(selectedImage, section)}
    </div>
  </div>
  </div>
}
