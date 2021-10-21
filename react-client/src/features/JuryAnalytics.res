@module("react-i18next") external useTranslation: string => 'a = "useTranslation"


type asyncErr = unit => unit
type cleanUp = unit => unit
type asyncOk<'t> = 't => unit
type forkT<'t> = (asyncErr, asyncOk<'t>, cleanUp) => unit

type async<'t> = {
  fork: forkT<'t>
}

type juryStat = {
  name: string,
  all: int,
  done: int
}

type juryStats = array<juryStat>

@module("../core/api.js") external asyncGet: string => async<'a> = "asyncGet"
@module("../core/api.js") external asyncGetCan: string => async<'a> = "asyncGet"

module ProfileMenu = {
  @react.component @module("./ProfileMenu.js")
  external make: () => React.element = "ProfileMenu"
}

module Link = {
  @react.component @module("react-router-dom")
  external make: (~to: string, ~className: string, ~children: React.element) => React.element = "Link"
}


@react.component
let make = (~id: string) => {
  let t = switch useTranslation("namespace1") {
    | [t, _, _] => a => t(a, a)
    | _ => (a: string) => a
  }

  let (stats, setStats) = React.useState(_ => []);
  let (canStart, setCanStart) = React.useState(_ => false);

  let failed = () => ()
  let cleanUp = () => ()
  
  let ok = (stats: juryStats) => {
    setStats(_ => stats)
    ()
  }

  let okCan = d => {
    setCanStart(_ => d)
    ()
  }

  React.useEffect0(() => {
    asyncGet("api/jury/analytics").fork(failed, ok, cleanUp)
    asyncGet("api/jury/canStart").fork(failed, okCan, cleanUp)
    None
  })

  let renderStats = stats => {
    stats -> Belt.Array.map(s => {
      <div key={s.name} className="flex justify-between p-2">
      <div className="uppercase text-xl">{React.string(s.name)}</div>
      <div className="text-xl">
      {
        (Belt.Int.toString(s.done) ++ " " ++ t("from") ++ " " ++ Belt.Int.toString(s.all)) -> React.string
      }
      </div>
      </div>
    }) -> React.array
  }

  let renderTotal = stats => {
    let (a, d) = stats -> Belt.Array.reduce((0, 0), ((all: int, done: int), stat) => {
      (all + stat.all, done + stat.done)
    })
    <div className="flex justify-between p-2 pt-5 border-0 border-t border-solid border-bright">
      <div className="uppercase text-xl">{React.string(t("stat-summary"))}</div>
      <div className="text-xl">
      {
        (Belt.Int.toString(d) ++ " " ++ t("from") ++ " " ++ Belt.Int.toString(a)) -> React.string
      }
      </div>
    </div>
  }

  let renderLink = (canStart) => {
    switch canStart {
      | true => <div className="flex-1"><Link className="self-start text-bright uppercase no-underline text-xl" to="jgallery">{React.string(t("jgallery"))}</Link></div>
      | false => React.string("")
    }
  }

  <div className="container flex justify-center flex-1 bg-brown-dark2 text-semi-bright"> 
    <div className="relative flex flex-col items-center flex-1 w-full">
        <div className="uppercase text-4xl text-semi-bright mb-20 font-header text-center mt-32">
        {React.string(t("jury-analytics"))}
        </div>
        <div className="w-1/2 mb-10">{ renderStats(stats) }</div>
        <div className="w-1/2">{ renderTotal(stats) }</div>
        <div className="w-1/2 mt-10">{renderLink(canStart)}</div>


        
    </div>
    <ProfileMenu/>
  </div>
}
