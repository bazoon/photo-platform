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


import { inspect } from "@xstate/inspect";
if (location.href.includes("foto.ru")) {
  inspect({
    url: "https://statecharts.io/inspect",
    iframe: false
  });
}


const Grid = ({store}) => {
  const { t } = useTranslation("namespace1");
  const [expandedRows, setExpandedRows] = useState([]);
  const [section, setSection] = useState(-1);
  

  const [current, send] = useMachine(Machine({api: "api/admin/contests"}), { devTools: true });
  const {context} = current;
  const {records, record, error, isOpen, meta} = context;
  const {onCancel, onOk, onChange, handleAdd} = useCrud(send, record);
 

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
      render: () => null
    },
  ];

  const showSection = ({id, index}) => {
    const props = {
      id,
      sectionId: index,
      key: index,
      baseZIndex: 0,
      dialogId: "Section"
    };
    store.sidebars.push({Component: renderSidebar, props});
  };

  const hideSection = (dialogId) => {
    store.sidebars = store.sidebars.filter(s => s.props.dialogId !== dialogId);
  };

  const renderSidebar = ({id, baseZIndex, sectionId, dialogId}) => {
    const section = contestSections[sectionId];
    const Component = section && section.Component;
    return (
      <Dialog visible={true} baseZIndex={baseZIndex} dismissableMask modal style={{width: "40vw"}}  onHide={() => hideSection(dialogId) }>
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
          contestSections.map(({title}, i) => <div className="inline mr-5"  key={i}><Button className="p-button-outlined p-button-sm p-button-text"  label={title} onClick={() => showSection({id, index: i})}/></div>)
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
        style={{width: "100%"}}
        scrollable scrollHeight="400px"
      >
        <Column expander style={{ width: "3em" }} />
        {
          meta.columns.map(({dataIndex, title, width, body = record => record[dataIndex]}) => 
            <Column headerStyle={{width}} key={dataIndex} field={dataIndex} header={title} body={body}></Column>)
        }
      </DataTable>

      {
        isOpen && <Form fields={meta.fields} saveError={error} record={record} visible={isOpen} onCancel={onCancel} onOk={onOk} onChange={onChange}/> 
      }
    </>
  );
};

export default collect(Grid);
