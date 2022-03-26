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
import {keys, values} from "lodash/fp";

const imageBodyTemplate = (record) => {
  return <img className="object-cover w-36 h-36" src={record.img}/>;
};

const columnsFromSchema = ({properties}, t) => {
  return keys(properties).filter(e => e !== "id").map(name => ({name, ...properties[name], label: t(properties[name].label)}));
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
  return function Main() {
    const { t } = useTranslation("namespace1");
    const [current, send] = useMachine(machine, { devTools: true });
    const {context} = current;
    const {records, record, error, isOpen, meta, dialogTitle} = context;
    const {onCancel, onOk, onChange, handleEdit, handleAdd, handleDelete} = useCrud(send, record);
    const canExpand = !! rowExpansionTemplate;
    const [selection, setSelection] = useState(null);
    const [expandedRows, setExpandedRows] = useState({});

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


    let columns;
    const {columnsSchema} = meta;
    if (meta.columns) {
      columns = meta.columns.map(addRender);
    } else if (columnsSchema) {
      columns = columnsFromSchema(columnsSchema, t);
      // columns = meta.properties.columns.enum.filter(e => !e.hidden).map(e => ({...e, dataIndex: e.name, title: e.title, key: e.name, type: e.type})).map(addRender);
      // fields = meta.properties.fields.enum.filter(e => !e.hidden).map(e => ({...e, dataIndex: e.name, title: e.title, key: e.name, type: e.type})).map(addRender);
    }

    const actionBodyTemplate = (rowData) => {
      return (
        <div className="flex w-40">
          {
            <Button disabled={!canEdit} icon="pi pi-pencil" className="mr-5 p-button-rounded p-button-success" onClick={() => handleEdit(rowData)} />
          }
          {
            <Button disabled={!canDelete} icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={e => onDelete(e, rowData)} />
          }

          {
            customOperations.map(operation => operation(rowData))
          }
        </div>
      );
    }; 

    useEffect(() => {
      send("load");
    }, []);

    const renderTextColumn = value => {
      return value;
    };

    const renderBooleanColumn = value => {
      return value ? <i className="pi pi-check"/> : "";
    };

    const getColumnsClass = type => {
      return {
        "boolean": "text-center"
      }[type] || "text-left";
    };

    const renderColumn = ({name, title, type, width}) => {
      const render = {
        boolean: renderBooleanColumn,
        string: renderTextColumn,

      }[type] || renderTextColumn;

      const renderValue = rowData => { 
        return render(rowData[name]);
      };

      return (
        <Column 
          className={getColumnsClass(type)}
          headerClassName={getColumnsClass(type)}
          headerStyle={{width}} 
          key={name} 
          field={name} 
          header={title} 
          body={renderValue}/>
      );
    };

    return (
      <>
        <div className="text-lg text-3xl">{title}</div>
        {Toolbar && <Toolbar refresh={() => send("load")} selection={selection}/>}
        {
          canAdd && (
            <div className="mb-4">
              <Button data-cy="addButton" onClick={handleAdd}>{t("add")}</Button>
            </div>
          )
        }
        <DataTable 
          value={records} 
          style={{width: "100%"}} 
          rowExpansionTemplate={rowExpansionTemplate}
          onRowToggle={e => { setExpandedRows(e.data); }}
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
          <Column key="actionBodyTemplate" headerStyle={{width: 150}} body={actionBodyTemplate}></Column>
          {
            columns.map(renderColumn)
          }
        </DataTable>
        {
          isOpen && (
            <Form 
              schema={meta.fieldsSchema} 
              title={dialogTitle} 
              dialogConfig={dialogConfig}
              saveError={error}
              record={record}
              visible={isOpen}
              onCancel={onCancel} 
              onOk={onOk} 
              onChange={onChange}
            />
          )
        }
      </>
    );
  };

};


