import React, {useEffect, useState} from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import Form from "./Form";
import { useTranslation } from "react-i18next";
import { useMachine } from "@xstate/react";
import useCrud from "../../core/hooks/useCrud";
import { confirmPopup } from "primereact/confirmpopup"; 
import identity from "crocks/combinators/identity";

const imageBodyTemplate = (record) => {
  return <img className="object-cover w-36 h-36" src={record.img}/>;
};


export default ({
  customOperations = [],
  canEdit = true,
  canDelete = true,
  canAdd = true,
  setRefresh = () => {},
  title,
  rowExpansionTemplate = undefined,
  onRowToggle = () => {},
  dialogConfig = {},
  machine,
  hasCheck = false,
  Toolbar = null
}) => {
  return function Main({expandedRows}) {
    const { t } = useTranslation("namespace1");
    const [current, send] = useMachine(machine);
    const {context} = current;
    const {records, record, error, isOpen, meta, dialogTitle} = context;
    const {onCancel, onOk, onChange, handleEdit, handleAdd, handleDelete} = useCrud(send, record);
    const canExpand = !! rowExpansionTemplate;
    const [selection, setSelection] = useState(null);

    setRefresh(() => send("refresh"));

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
        <div className="flex w-40">
          {
            canEdit && <Button icon="pi pi-pencil" className="mr-5 p-button-rounded p-button-success" onClick={() => handleEdit(rowData)} />
          }
          {
            canDelete && <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={e => onDelete(e, rowData)} />
          }
          {customOperations.map(operation => operation(rowData))}
        </div>
      );
    }; 

    useEffect(() => {
      send("load");
    }, []);
    return (
      <>
        <div className="mb-10 text-lg text-3xl">{title}</div>
        {Toolbar && <Toolbar refresh={() => send("load")} selection={selection}/>}
        {
          canAdd && (
            <div className="mb-4">
              <Button onClick={handleAdd}>{t("add")}</Button>
            </div>
          )
        }
        <DataTable 
          value={records} 
          style={{width: "100%"}} 
          rowExpansionTemplate={rowExpansionTemplate}
          onRowToggle={e => { onRowToggle(e.data); }}
          expandedRows={expandedRows}
          onSelectionChange={({value}) => setSelection(value)}
          selection={selection}
          selectionMode="checkbox"
          dataKey="id"
        >
          {
            canExpand && <Column expander style={{ width: "3em" }} />
          }

          {
            hasCheck && <Column selectionMode="multiple" headerStyle={{ width: "3rem" }}></Column>
          }
          <Column key="actionBodyTemplate" headerStyle={{width: 50}} body={actionBodyTemplate}></Column>
          {
            columns.map(({dataIndex, title, width, body = record => record[dataIndex]}) => 
              <Column headerStyle={{width}} key={dataIndex} field={dataIndex} header={title} body={body}></Column>)
          }


        </DataTable>
        {
          isOpen && <Form title={dialogTitle} dialogConfig={dialogConfig} fields={meta.fields} saveError={error} record={record} visible={isOpen} onCancel={onCancel} onOk={onOk} onChange={onChange}/> 
        }
      </>
    );
  };

};


