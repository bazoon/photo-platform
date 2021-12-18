@module("react-i18next") external useTranslation: string => 'a = "useTranslation"

@send external scrollBy: Dom.element => (int, int) => unit = "scrollBy"

type image = {
  id: string,
  description: string,
  filename: string,
  name: string,
  place: string,
  year: string,
  rate: int
}

type images = array<image>

type section = {
  id: string,
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


type id = {
  id: string
}

type dropdownEvent = { 
  value: id
}

type options = array<section>;
type mode = SINGLE | MULTI

type rateT = {
  rate: int
}


type contestInfo = {
  name: string,
  salone: string
}

type store = {
  info: option<contestInfo>
}

@module("react-recollect") external store: store = "store"
@module("../core/api.js") external asyncGetSections: string => async<sectionsPayload> = "asyncGet"
@module("../core/api.js") external asyncGetImages: string => async<images> = "asyncGet"
@module("../core/api.js") external asyncPutRate: (string, 'b) => async<rateT> = "asyncPut"

module Dialog = {
  @react.component @module("primereact/dialog")
  external make: (
    ~children: React.element,
    ~onHide: unit => unit,
    ~visible: bool,
    ~header: bool,
    ~maximized: bool,
    ~contentClassName: string,
  ~maximizable: bool) => React.element = "Dialog"
}

module Button = {
  @react.component @module("primereact/button")
  external make: (~children: React.element, ~onClick: unit => unit, ~className: string) => React.element = "Button"
}

module RadioButton = {
  @react.component @module("primereact/radiobutton")
  external make: (~onChange: unit => unit, ~checked: bool, ~name: string) => React.element = "RadioButton"
}

module Dropdown = {
  @react.component @module("primereact/dropdown")
  external make: (
    ~options: array<section>, 
    ~className: string, 
    ~value: 'p,
    ~optionLabel: string, 
    ~optionsValue: string,
    ~onChange: 'a => unit) => React.element = "Dropdown"
}

module Link = {
  @react.component @module("react-router-dom")
  external make: (~to: string, ~className: string, ~children: React.element) => React.element =
    "Link"
}

@module("lodash-lens") external over: 'l => 'f => 'o = "over"
@module("lodash-lens") external findLens: 'e => 'l = "over"

@react.component
let make = (~id: string) => {
  let t = switch useTranslation("namespace1") {
    | [t, _, _] => a => t(a, a)
    | _ => (a: string) => a
  }
  let ref = React.useRef(Js.Nullable.null)
  let (current, setCurrent) = React.useState(_ => 0)
  let (left, setLeft) = React.useState(_ => 0)
  let (visiblePhotos, setVisiblePhotos) = React.useState(_ => [])
  let (photo, setPhoto) = React.useState(_=> None)
  let (mode, setMode) = React.useState(_ => SINGLE)
  let (sections, setSections) = React.useState(_ => []);
  let (section, setSection) = React.useState(_ => None);
  let (selectedImage, setSelectedImage) = React.useState(_ => None);
  let (isPreview, setIsPreview) = React.useState(_ => false)

  let cleanUp = () => ()
  let failed = ()  => ()


  let okImages = (s: option<section>) => images => {
    let id = switch s {
      | None => ""
      | Some(sec) => sec.id
    }
    setSections(sections => {
      let newSections = sections -> Belt.Array.map((x:section) => x.id == id ? {...x, images: images} : x)
      setSection(_ => newSections -> Belt.Array.getBy(e => e.id == id))
      setSelectedImage(_ => images -> Belt.Array.get(0))
      newSections
    })
    ()
  }

  let loadSection = (s: option<section>) => {
    let id = switch s {
      | None => ""
      | Some(sec) => sec.id
    }
    asyncGetImages(`api/jury/images/${id}`).fork(failed, okImages(s), cleanUp)
  }

  let sectionsOk = data => {
    setSections(_ => data)
    let s = data -> Belt.Array.get(0)
    loadSection(s);
    ()
  }
  

  let selectSection = (sections, e: dropdownEvent) => {
    loadSection(sections -> Belt.Array.getBy((s:section) => s.id == e.value.id))
    ()
  }

  let loadSections = () => {
    asyncGetSections("api/jury/sections").fork(failed, sectionsOk, cleanUp)
    ()
  }

  React.useEffect0(() => {
    loadSections()
    None
  })

  let renderSwitch = () => {
    <div className="absolute left-0 grid grid-cols-3">
      <Link to="/jury-analytics" className="text-bright"><i className="pi pi-chart-line"/></Link>      
      <i className="text-tiny pi pi-th-large text-semi-bright mr-5" onClick={_ => setMode(_ => SINGLE)}/>
      <i className="text-tiny pi pi-table text-semi-bright" onClick={_ => setMode(_ => MULTI)}/>
    </div>
  };

  let renderSections = (sections: array<section>, section: option<section>) => {
    <Dropdown options={sections} className="w-full" onChange={e => selectSection(sections, e)} value={section} optionsValue="id" optionLabel="name"/>
  };



  let preview = _ => setIsPreview(_ => true)
  let hidePreview = () => setIsPreview(_ => false)

  let selectImage = im => _ => {
    let isSelected = switch selectedImage {
      | Some(i) => i == im
      | None => false
    }
 
    if (isSelected) {
      preview() 
    } else {
      setSelectedImage(_ => Some(im)) 
    }
  }

  let renderPreview = im => {
    <Dialog visible={isPreview} onHide={hidePreview} header={false} maximized={true} maximizable={true}
    contentClassName="flex justify-center">
    {
      switch im {
        | Some(img) => <div><img src={img.filename} className="preview"/></div>
        | None => <div></div>
      }
    }
    </Dialog>
  }


  let renderImage = (im: image) => {
    <img onClick={selectImage(im)} title={im.name} className="w-24 h-24 cursor-pointer" key={im.id} src={im.filename}/>
  }


  let scrollRight = () => {
    switch ref.current-> Js.Nullable.toOption {
      | Some(dom) => dom->scrollBy(50, 0)
      | None => ()
    }
  }

  let scrollLeft = () => {
    switch ref.current-> Js.Nullable.toOption {
      | Some(dom) => dom->scrollBy(-50, 0)
      | None => ()
    }
  }

  let renderSlider = (section) => {
    let images = switch section {
      | Some(s) => s.images
      | None => []
    }
  
    let visible = images -> Belt.Array.map(renderImage)
    
    <div className="flex items-center justify-center relative">

      <i className="text-2xl -left-10 absolute cursor-pointer hover:text-brown-light pi pi-angle-left text-semi-bright" onClick={_ => scrollLeft()}/>

      <div className="flex gap-5 overflow-x-auto p-5 w-full overflow-y-hidden invisible-scroll relative" ref={ReactDOM.Ref.domRef(ref)}>
        {React.array(visible)}
      </div>

      <i className="text-2xl absolute -right-10 cursor-pointer hover:text-brown-light pi pi-angle-right text-semi-bright" onClick={_ => scrollRight()}/>
    </div>
  }

  let rateOk = d => {
    ()
  }

  let rate = (rate, img: option<image>, section) => {
    switch (img, section) {
      | (Some(img), Some(s)) => {
        setSections(sections => {
          let newImage = {...img, rate: rate}
          let newImages = s.images -> Belt.Array.map((im: image) => im.id == img.id ? newImage : im)
          let newSection = {...s, images: newImages}
          let newSections = sections -> Belt.Array.map((x:section) => x.id == newSection.id ? newSection : x)
          setSection(_ => newSections -> Belt.Array.getBy(e => e.id == newSection.id))
          setSelectedImage(_ => Some(newImage))
          asyncPutRate(`api/jury/image/${img.id}`, {rate: rate}).fork(failed, rateOk, cleanUp)
          newSections
        })
      }
      |_ => ()
    }

    /* switch img { */
    /* | Some(im) => { */
    /*     setSection(s => { */
    /*       let newSection = {...s, images: s.images -> Belt.Array.map(i => i.id == im.id ? {...i, rate: rate } : i ) } */
    /*       newSection */
    /*     }) */
    /*   } */
    /* | _ => () */
    /* } */
    ()
  }

  let renderRates = (img: option<image>, section) => {
    let hasRate = r => {
      switch img {
        |Some(i) => i.rate == r
        |None => false
      }
    }

    Js.log(img)

    let baseCls = "z-10 font-text w-8 h-8 flex rounded-full text-base cursor-pointer mr-8 last:mr-0 justify-center
    rounded-round items-center text-semi-bright";
    let ratedCls = " bg-brown-light text-dark"


    <div className="flex justify-between background:bg-brown-dark p-4 items-center before:backdrop-blur-md">
      <div className="absolute left-0 right-0 top-0 bottom-0 opacity-40 bg-black"></div>
      {
        Belt.Array.range(1, 10) -> Belt.Array.map(i => {
          let className = if hasRate(i) {baseCls ++ ratedCls} else {baseCls}
          <div key={Belt.Int.toString(i)} className={className} onClick={_ => rate(i, img, section)}>{React.string(Belt.Int.toString(i))}</div>
        }) -> React.array
      } 
    </div>
  }

  let renderSingle = (im, sections: array<section>, section: option<section>) => {
    let (filename, name) = switch im { | Some(i) => (i.filename, i.name) | None => ("", "") }

    <div className="flex flex-col h-full">
        <div className="uppercase text-semi-bright mb-5 text-4xl text-center mt-10">
        {
          switch store.info {
            |Some(i) => React.string(i.salone)
            |None => <></>
          }
        }
        </div>
        <div className="uppercase text-semi-bright mb-10 text-3xl text-center">
        {
          switch store.info {
            |Some(i) => React.string(i.name)
            |None => <></>
          }
        }
        </div>
      <div className="flex justify-center h-full relative">
        <img src={filename} className="responsive"/>
        <div className="absolute bottom-32">
          {renderRates(im, section)}
        </div>
        <div className="absolute bottom-20 text-4xl text-bright">
          {React.string(name)}
        </div>
        <div className="absolute w-2/5 bottom-7">
          {renderSections(sections, section)}
        </div>
      </div>
      <div className="flex items-center justify-center h-24 relative">
        {renderSwitch()}
        <div className="mb-5 w-4/5">
          {renderSlider(section)}
        </div>
      </div>
    </div>
  };

  /* let renderMultiple = () => { */
  /*   <div> */
  /*     <ul className="flex flex-wrap mb-16 list-none"> */
  /*       { */
  /*         photos.slice(0, 6 * 4).map((p, i) => ( */
  /*           <li key={i} className="flex-1 h-15vh"> */
  /*             <img className={"max-h-full min-w-full object-cover opacity-50 hover:opacity-100"} onClick={() => handleClick(i)} title={i} key={p.id} src={p.src}/> */
  /*           </li> */
  /*         )) */
  /*       } */
  /*       <li style={{flex: 10}}></li> */
  /*     </ul> */
      
  /*     <div className="flex items-center justify-center relative"> */
  /*       {renderSwitch()} */
  /*       {renderSections()} */
  /*     </div> */
  /*   </div> */
  /* }; */

  /* let setRate = (id, r) => { */
  /*   setRates(rates =>({...rates, [id]: r})); */
  /* }; */

    let style = ReactDOM.Style.make(~minHeight = "calc(100vh - 16rem)", ())

    <div className="container flex flex justify-center flex-1 bg-brown-dark" style={style}> 
      <div className="wrap">
        {
          renderSingle(selectedImage, sections, section)
        }
      </div>
      {renderPreview(selectedImage)}
    </div>

}
