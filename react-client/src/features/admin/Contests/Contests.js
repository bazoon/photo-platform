import React, {useState, useEffect} from "react";
import Modal from "antd/lib/modal/Modal";
import {Button} from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useTranslation } from "react-i18next";
import Form from "../../../components/Crud/Form";
import Machine from "../../../features/machines/CrudMachine";
import useCrud from "../../../core/hooks/useCrud";
import G from "../../../components/Crud/Grid";
import {useMachine} from "@xstate/react";
import { TabView, TabPanel } from "primereact/tabview";
import {range} from "lodash/fp";
import Jury from "./Jury";
import { Sidebar } from "primereact/sidebar";
import About from "./About";
import Results from "./Results";
import Photos from "./Photos";
import Nominations from "./Nominations";

export default function LexiconsGrid() {
  const { t } = useTranslation("namespace1");
  const [expandedRows, setExpandedRows] = useState([]);
  const [currentRecord, setRecord] = useState(null);
  const [api, setApi] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [section, showSection] = useState(-1);
  

  const [current, send] = useMachine(Machine({api: "api/admin/contests"}));
  const {context} = current;
  const {records, record, error, isOpen, meta} = context;
  const {onCancel, onOk, onChange, handleEdit, handleAdd, handleDelete} = useCrud(send, record);
 

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

  const renderSidebar = id => {
    const Component = contestSections[section] && contestSections[section].Component;
    return (
      <Sidebar visible={section >= 0} dismissable modal position="right" style={{width: "80%"}}  onHide={() => showSection(-1) }>
        {Component && <Component id={id}/>}
      </Sidebar>
    );
  };

  useEffect(() => {
    send("load");
  },[]);

  const onRowExpand = ({data, id}) => {
    // const api = "api/admin/phrases/";   
    // setApi(api);
    // setExpandedId(id);
  };

  const rowExpansionTemplate = ({id}) => {
    // const Grid = G({api: "api/admin/phrases", apiParams: {id}});
    // return <Grid/>;
    
    return (
      <div style={{width: "100%", overflowX: "auto"}}>
        {
          contestSections.map(({title, render}, i) => <div className="inline mr-5"  key={i}><Button className="p-button-outlined p-button-sm p-button-text"  label={title} onClick={() => showSection(i)}/></div>)
        }
        {
          renderSidebar(id)
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
}

