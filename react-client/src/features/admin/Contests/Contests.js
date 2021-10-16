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
import { Sidebar } from "primereact/sidebar";
import About from "./About";
import Results from "./Results";
import Photos from "./Photos";
import Nominations from "./Nominations";
import {collect} from "react-recollect";
import {Dialog} from "primereact/dialog";
import Applications from "./Applications";
import {make as Moder} from "./Moder.bs";
import {keys} from "lodash/fp";


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
  const [section, setSection] = useState(-1);
  
  const [current, send] = useMachine(Machine({api: "api/admin/contests"}), { devTools: true });
  const {context} = current;
  const {records, record, error, isOpen, meta} = context;
  const {onCancel, onOk, onChange, handleAdd} = useCrud(send, record);
  const columnsSchema = meta.columnsSchema || {};
  const fieldsSchema = meta.fieldsSchema || {};

  const contestSections = [ 
    {
      title: "О конкурсе",
      Component: About
    },
    {
      title: "Фотографии",
      Component: Photos
    },
    {
      title: "Жюри",
      Component: Jury
    },
    {
      title: "Номинации",
      Component: Nominations
    },
    {
      title: "Результаты",
      Component: Results
    },
    {
      title: "Награды",
      render: () => null
    },
    {
      title: "Заявки",
      Component: Applications
    },
    {
      title: "Модерация",
      Component: Moder
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
    store.sidebars.push({Component: renderSidebar, props});
  };

  const hideSection = (dialogId) => {
    store.sidebars = store.sidebars.filter(s => s.props.dialogId !== dialogId);
  };

  const renderSidebar = ({id, baseZIndex, sectionId, dialogId, title}) => {
    const section = contestSections[sectionId];
    const Component = section && section.Component;
    return (
      <Dialog header={title} contentClassName="flex-1" visible={true} baseZIndex={baseZIndex} dismissableMask modal style={{width: "90vw", height: "80vh"}}  onHide={() => hideSection(dialogId) }>
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
          contestSections.map(({title}, i) => <div className="inline mr-5"  key={i}><Button className="p-button-outlined p-button-sm p-button-text"  label={title} onClick={() => showSection({id, index: i, title})}/></div>)
        }
      </div>
    );
  };

  return (
    <>
      <div className="mb-4">
        <Button onClick={handleAdd}>{t("add")}</Button>
      </div>
      <DataTable 
        value={records}
        expandedRows={expandedRows}
        onRowToggle={e => setExpandedRows(e.data)}
        rowExpansionTemplate={rowExpansionTemplate}
        onRowExpand={onRowExpand}
        style={{width: "4000px"}}
        scrollable scrollHeight="400px"
      >
        <Column expander style={{ width: "10em" }} />
        {
          columnsFromSchema(columnsSchema, t).map(({name, title, width, body = record => record[name]}) => 
            <Column headerStyle={{width: "300px"}} key={name} field={name} header={title} body={body}></Column>)
        }
      </DataTable>

      {
        isOpen && <Form fields={fieldsFromSchema(fieldsSchema)} saveError={error} record={record} visible={isOpen} onCancel={onCancel} onOk={onOk} onChange={onChange}/> 
      }
    </>
  );
};

export default collect(Grid);
