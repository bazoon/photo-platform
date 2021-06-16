import i18n from "i18next";
import React, {useEffect} from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import Form from "./Form";
import { useTranslation } from "react-i18next";
import { useMachine } from "@xstate/react";
import Machine from "../../features/machines/CrudMachine";
import useCrud from "../../core/hooks/useCrud";
import useColumns from "../../core/hooks/useColumns";
import identity from "crocks/combinators/identity";
import { confirmPopup } from "primereact/confirmpopup"; 

const imageBodyTemplate = (record) => {
  return <img className="object-cover w-36 h-36" src={record.img}/>;
};


export default ({api, customOperations = [], width = "100%", apiParams = {}}) => {
  return function Main() {
    const [current, send] = useMachine(Machine({api, apiParams}));
    const {context} = current;
    const {records, record, error, isOpen, meta} = context;
    const { t } = useTranslation("namespace1");
    const {onCancel, onOk, onChange, handleEdit, handleAdd, handleDelete} = useCrud(send, record);
    const addRender = column => {
      if (column.type === "file") {
        column.body = imageBodyTemplate;
      }
      return column;
    };


    const onDelete = (event, data) => {
      confirmPopup({
        target: event.currentTarget,
        message: t("are_you_sure"),
        icon: "pi pi-exclamation-triangle",
        accept: () => handleDelete(data),
        reject: () => {}
      });
    };

    const columns = meta.columns.map(addRender);
    const actionBodyTemplate = (rowData) => {
      return (
        <React.Fragment>
          <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" style={{marginRight: 5}}  onClick={() => handleEdit(rowData)} />
          <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" style={{marginRight: 5}} onClick={e => onDelete(e, rowData)} />
          {customOperations.map(operation => operation(rowData))}
        </React.Fragment>
      );
    }; 

    useEffect(() => {
      send("load");
    }, []);

    return (
      <>
        <div className="mb-4">
          <Button onClick={handleAdd}>{t("add")}</Button>
        </div>
        <DataTable value={records} scrollable style={{width}}>
          <Column body={actionBodyTemplate}></Column>
          {
            columns.map(({dataIndex, title, width, body = record => record[dataIndex]}) => 
              <Column width={width} key={dataIndex} field={dataIndex} header={title} body={body}></Column>)
          }
        </DataTable>
        {
          isOpen && <Form fields={meta.fields} saveError={error} record={record} visible={isOpen} onCancel={onCancel} onOk={onOk} onChange={onChange}/> 
        }
      </>
    );
  };

};


