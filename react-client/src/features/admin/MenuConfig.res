type asyncErr = unit => unit
type cleanUp = unit => unit
type asyncOk<'t> = 't => unit
type forkT<'t> = (asyncErr, asyncOk<'t>, cleanUp) => unit

type async<'t> = {
  fork: forkT<'t>
}

@module("react-i18next") external useTranslation: string => 'a = "useTranslation"

type listOption = {
  label: string,
  value: string
}

type menuItem = {
  id: int,
  code: string,
  parentId: int,
  position: int
}

type menuItems = array<menuItem>

type payload = {
  parent: menuItem,
  children: menuItems
}

type lexicon = {
  id: int,
  code: string
}

type lexicons = array<lexicon>

@module("../../core/api.js") external asyncGet: string => async<payload> = "asyncGet"
@module("../../core/api.js") external asyncGetLexicons: string => async<lexicons> = "asyncGet"

@module("../../core/utils.js") external showConfirm: (
  ~content: React.element, 
  ~header: React.element, 
  ~cancelButton: option<React.element>=?, 
  ~confirmButton: option<React.element>=?
) => async<'t> = "showConfirm"

module Button = {
  @react.component @module("primereact/button")
  external make: (~children: React.element=?, ~onClick: unit => unit, ~className: string=?, ~icon: string=?) => React.element = "Button"
}

type fieldInput = {
  value: string,
  onChange: string => unit
}

type fieldT = {
  input: fieldInput
}

type fieldRender = fieldT => React.element

module Field = {
  @react.component @module("react-final-form")
  external make: (~name: string, ~render: fieldRender) => React.element = "Field"
}

module Dropdown = {
  @react.component @module("primereact/dropdown")
  external make: (~id: string, ~optionLabel: string, ~options: lexicons, ~value: string, ~onChange: string => unit) => React.element = "Dropdown"
}

module Tree = {
  @react.component @module("react-animated-tree")
  external make: (~children: React.element=?, ~content: React.element=?, ~\"type": 'a=?, ~canHide: bool=?, ~\"open": bool=?) => React.element = "default"
}

module RadioButton = {
  @react.component @module("primereact/radiobutton")
  external make: (~onChange: unit => unit, ~checked: bool, ~name: string) => React.element = "RadioButton"
}

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


@react.component
let make = (~id: string) => {
  let (items, setItems) = React.useState(_ => []);
  let (parent, setParent) = React.useState(_ => None);
  let (children, setChildren) = React.useState(_ => []);
  let (lexicons, setLexicons) = React.useState(_ => []);

  let cleanUp = () => ()
  let failed = () => ()

  let handleEdit = item => {
    ()
  }

  let add = () => ()

  let cancel = () => ()

  let renderAddDialog = item => {
    <div>

      <Field name="lexId" render={({input}) => (
        <div className="p-field">
          <div>
            <label htmlFor="lexId">{React.string("Lexicon")}</label>
            <Dropdown id="id" value={input.value} onChange={input.onChange} options={lexicons} optionLabel="code" />
          </div>
        </div>
      )} />
    </div>
  }

  let addOk = () => {
    ()
  }

  let handleAdd = item => {
    /* setChildren(children => Belt.Array.concat(children, [{id: -1, code}])) */
    showConfirm(
      ~content = {renderAddDialog(item)},
      ~cancelButton = None, ~confirmButton = None, 
      ~header = <span>{React.string("dwd")}</span>
    ).fork(cancel, addOk, cleanUp)
    ()
  }

  let renderControls = (item: menuItem) => {
    <div className="inline-flex">
      <div className="mr-5">{React.string(item.code)}</div>
      <Button className="mr-2" icon="pi pi-pencil" onClick={() => handleEdit(item)}/>
      <Button className="mr-2" icon="pi pi-plus" onClick={() => handleAdd(item)}/>
      <Button className="mr-2" icon="pi pi-trash" onClick={() => handleEdit(item)}/>
      <Button className="mr-2" icon="pi pi-arrow-down" onClick={() => handleEdit(item)}/>
      <Button className="mr-2" icon="pi pi-arrow-up" onClick={() => handleEdit(item)}/>
    </div>
  }

  let rec renderItem = (item: menuItem, items, level: int) => {
    let children: menuItems = items -> Belt.Array.reduce([], (a, e: menuItem) => if e.parentId == item.id  { Belt.Array.concat(a, [e]) } else { a })
      
    if (Belt.Array.length(children) === 0) {
      <Tree content={renderControls(item)} />
    } else {
      <Tree \"open"={true} content={React.string(item.code)} \"type"={<span></span>}>
        {
          children -> Belt.Array.map(i => renderItem(i, children, level * 8)) -> React.array
        }
      </Tree>
    }
  }

  let loadOk = menu => {
    setChildren(_ => menu.children)
    setParent(_ => Some(menu.parent))
    ()
  }


  let load = () => {
    asyncGet("api/admin/menuConfig/" ++ id).fork(failed, loadOk, cleanUp)
  }

  let loadLexiconsOk = (d: lexicons) => {
    setLexicons(_ => d)
  }

  let loadLexicons = () => {
    asyncGetLexicons("api/admin/lexicons").fork(failed, loadLexiconsOk, cleanUp)
  }
  
  React.useEffect0(() => {
    load()
    loadLexicons()
    None
  })

  <div className="mt-10 text-3xl">
    {
      switch parent {
        | None => <div>{React.string("None")}</div>
        | Some(p) => renderItem(p, children, 1)
      }
    }

  </div>
}
