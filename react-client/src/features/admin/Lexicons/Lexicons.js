import React, {useState, useEffect} from "react";
import Modal from "antd/lib/modal/Modal";
import {Button} from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import {asyncGet} from "../../../core/api";
import { useTranslation } from "react-i18next";
import Form from "../../../components/Crud/Form";
import Machine from "../../../features/machines/CrudMachine";
import useCrud from "../../../core/hooks/useCrud";
import G from "../../../components/Crud/Grid";
import {useMachine} from "@xstate/react";

export default function LexiconsGrid() {
  const { t } = useTranslation("namespace1");
  const [expandedRows, setExpandedRows] = useState([]);
  const [currentRecord, setRecord] = useState(null);
  const [api, setApi] = useState("");
  const [expandedId, setExpandedId] = useState(null);

  const [current, send] = useMachine(Machine({api: "api/admin/lexicons"}));
  const {context} = current;
  const {records, record, error, isOpen, meta} = context;
  const {onCancel, onOk, onChange, handleEdit, handleAdd, handleDelete} = useCrud(send, record);
 

  useEffect(() => {
    send("load");
  },[]);

  const onRowExpand = ({data, id}) => {
    // const api = "api/admin/phrases/";   
    // setApi(api);
    // setExpandedId(id);
  };

  const rowExpansionTemplate = ({id}) => {
    const Grid = G({api: "api/admin/phrases", apiParams: {id}});
    return <Grid/>;
  };

  const operations = [
    record => <Button key={record.id} icon="pi pi-book" className="p-button-rounded p-button-secondary" onClick={() => handleEdit(record)}/>
  ];

  console.log(error);

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
      >
        <Column expander style={{ width: "3em" }} />
        <Column field="code" header="code"></Column>
        <Column field="category" header="category"></Column>
      </DataTable>

      {
        isOpen && <Form fields={meta.fields} saveError={error} record={record} visible={isOpen} onCancel={onCancel} onOk={onOk} onChange={onChange}/> 
      }
    </>
  );
}

