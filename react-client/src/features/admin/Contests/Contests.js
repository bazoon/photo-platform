import React, {useState, useEffect} from "react";
import {Button} from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useTranslation } from "react-i18next";
import Form from "../../../components/Crud/Form";
import Machine from "../../../features/machines/CrudMachine";
import useCrud from "../../../core/hooks/useCrud";
import {useMachine} from "@xstate/react";
import Jury from "./Jury";
import About from "./About";
import Results from "./Results";
import Photos from "./Photos";
import Nominations from "./Nominations";
import {collect} from "react-recollect";
import {Dialog} from "primereact/dialog";
import Applications from "./Applications";
import {make as Moder} from "./Moder.bs";
import { InputSwitch } from "primereact/inputswitch";
import {keys} from "lodash/fp";
import {make as ShortList} from "../../ShortList.bs";
import {findLens, over, view} from "lodash-lens";
import {asyncPut} from "../../../core/api";
import {isDefined} from "crocks";
import MenuConfig from "../MenuConfig";
import useAuth from "../../../core/hooks/useAuth";

// import { inspect } from "@xstate/inspect";
// if (location.href.includes("foto.ru")) {
//   inspect({
//     url: "https://statecharts.io/inspect",
//     iframe: false
//   });
// }


const fieldsFromSchema = ({properties}) => {
  return keys(properties).filter(e => e !== "id").map(name => ({name, ...properties[name]}));
};

const columnsFromSchema = ({properties}, t) => {
  return keys(properties).filter(e => e !== "id").map(name => ({name, ...properties[name], label: t(properties[name].label)}));
};

const Grid = ({store}) => {
  const { t } = useTranslation("namespace1");
  const [expandedRows, setExpandedRows] = useState([]);
  const [current, send] = useMachine(Machine({api: "api/admin/contests"}), { devTools: true });
  const {context} = current;
  const {records, record, error, isOpen, meta} = context;
  const {onCancel, onOk, onChange, handleAdd, handleEdit} = useCrud(send, record);
  const columnsSchema = meta.columnsSchema || {};
  const fieldsSchema = meta.fieldsSchema || {};

  const { canNot } = useAuth(store.permissions);

  const contestSections = [ 
    {
      title: "О конкурсе",
      Component: About,
      permissions: ["contestAbout.view", "domain.contestAbout.view"]
    },
    {
      title: "Фотографии",
      Component: Photos,
      permissions: ["photos.view", "domain.photos.view"]
    },
    {
      title: "Жюри",
      Component: Jury,
      testId: "jury",
      permissions: ["jury.view", "domain.jury.view"]
    },
    {
      title: "Номинации",
      Component: Nominations,
      permissions: ["nominations.view", "domain.nominations.view"]
    },
    {
      title: "Результаты",
      Component: Results,
      permissions: ["results.view", "domain.results.view"]
    },
    {
      title: "Награды",
      render: () => null
    },
    {
      title: "Заявки",
      Component: Applications,
      permissions: ["applications.view", "domain.applications.view"]
    },
    {
      title: "Модерация",
      Component: Moder,
      permissions: ["moderate.view", "domain.moderate.view"]
    },
    {
      title: "Шорт лист",
      Component: ShortList,
      permissions: ["shortList.view", "domain.shortList.view"]
    },
    {
      title: "Меню",
      Component: MenuConfig
    },
  ];

  const showSection = ({id, index, title}) => {
    const props = {
      id,
      sectionId: index,
      key: index,
      baseZIndex: 0,
      dialogId: "Section",
      title
    };
    store.sidebars && store.sidebars.push({Component: renderSidebar, props});
  };

  const hideSection = (dialogId) => {
    store.sidebars = store.sidebars.filter(s => s.props.dialogId !== dialogId);
  };

  const renderSidebar = ({id, baseZIndex, sectionId, dialogId, title}) => {
    const section = contestSections[sectionId];
    const Component = section && section.Component;
    return (
      <Dialog header={title} contentClassName="flex-1" visible={true} baseZIndex={baseZIndex} dismissableMask modal style={{width: "90vw", height: "50vh"}}  onHide={() => hideSection(dialogId) }>
        {Component && <Component id={id}/>}
      </Dialog>
    );
  };

  useEffect(() => {
    send("load");
  },[]);

  const onRowExpand = () => {
  };

  const rowExpansionTemplate = ({id}) => {
    return (
      <div style={{width: "100%", overflowX: "auto"}}>
        {
          contestSections.map(({title, permissions = [], testId}, i) => (
            <Button disabled={canNot(permissions)} key={i} data-cy={testId} className="mr-5 p-button-outlined p-button-sm p-button-text" label={title} onClick={() => showSection({id, index: i, title})}/>
          )
          )
        }
      </div>
    );
  };

  const saveFailed = () => {

  };

  const saveOk = d => {

  };

  const onChangeBoolean = (value, record, fieldName) => {
    const recs = over(findLens({id: record.id}), rec => ({...rec, [fieldName]: value}), records);
    send("refresh", {records: recs});
    asyncPut(`api/admin/contests/${record.id}`, {...record, [fieldName]: value}).fork(saveFailed, saveOk);
  };

  const valueTemplate = (rowData, fieldInfo) => {
    const type = columnsSchema.properties[fieldInfo.field].type;
    return (
      type === "boolean" ? <InputSwitch checked={rowData[fieldInfo.field]} onChange={({value}) => onChangeBoolean(value, rowData, fieldInfo.field)}/> : rowData[fieldInfo.field]
    );
  };

  const fieldsConfig = record => {
    return {
      dateStart: {},
      dateStop: {
        minDate: record.dateStart
      },
      dateJuryEnd: {},
      dateRateShow: {}
    };
  };

  const validateForm = (values) => {
    const dateStart = new Date(values.dateStart);
    const dateStop = new Date(values.dateStop);
    const dateJuriEnd = new Date(values.dateJuriEnd);
    const dateRateShow = new Date(values.dateRateShow);

    let errors = {};

    if (dateStart >= dateStop) {
      errors.dateStart = "dateStartGtDateStop";
      errors.dateStop = "dateStopLsDateStart";
    }

    if (dateStop >= dateJuriEnd) {
      errors.dateStop = "dateStopGtDateJuryEnd";
      errors.dateJuriEnd = "dateJuryEndLsDateStop";
    }

    if (dateJuriEnd >= dateRateShow) {
      errors.dateJuriEnd = "dateJuryEndGtDateRateShow";
      errors.dateRateShow = "dateRateShowLsDateJuryEnd";
    }

    const required = fieldsSchema.required;

    const requiredErrors = required.reduce((a, e) => {
      if (!isDefined(values[e])) {
        a[e] = t("shouldNotBeEmpty");
      }
      return a;
    }, {});

    return {...requiredErrors, ...errors};
  };

    const actionBodyTemplate = (rowData) => {
      return (
        <div className="flex w-40">
          {
            <Button icon="pi pi-pencil" className="mr-5 p-button-rounded p-button-success" onClick={() => handleEdit(rowData)} />
          }
        </div>
      );
    }; 

  return (
    <>
      <div className="mb-4">
        <Button data-cy="addButton" onClick={handleAdd}>{t("add")}</Button>
      </div>
      <DataTable 
        value={records}
        expandedRows={expandedRows}
        onRowToggle={e => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
        onRowExpand={onRowExpand}
        style={{width: "4000px"}}
      >
        <Column expander style={{ width: "10em" }} />
        <Column key="actionBodyTemplate" headerStyle={{width: 150}} body={actionBodyTemplate}></Column>

        {
          columnsFromSchema(columnsSchema, t).map(({name, title, width, body = valueTemplate }) => 
            <Column headerStyle={{width: "300px"}} key={name} field={name} header={title} body={body}></Column>)
        }
      </DataTable>

      {
        isOpen && <Form schema={fieldsSchema} validateForm={validateForm} saveError={error} record={record} visible={isOpen} onCancel={onCancel} onOk={onOk} onChange={onChange}/> 
      }
    </>
  );
};

export default collect(Grid);
