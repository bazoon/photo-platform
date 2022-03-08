// import Grid from "../../../components/Crud/Grid";
// import CrudMachine from "../../machines/CrudMachine";
// const machine = CrudMachine({api: "api/admin/salones"});
// export default Grid({machine, width: 3000});

import React, {useState, useEffect} from "react";
import {Button} from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useTranslation } from "react-i18next";
import Form from "../../../components/Crud/Form";
import Machine from "../../../features/machines/CrudMachine";
import useCrud from "../../../core/hooks/useCrud";
import {useMachine} from "@xstate/react";
import {collect} from "react-recollect";
import {Dialog} from "primereact/dialog";
import { InputSwitch } from "primereact/inputswitch";
import {keys} from "lodash/fp";
import {findLens, over, view} from "lodash-lens";
import {asyncPut} from "../../../core/api";
import SaloneFiles from "../SaloneFiles/SaloneFiles";

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
  
  const [current, send] = useMachine(Machine({api: "api/admin/salones"}), { devTools: true });
  const {context} = current;
  const {records, record, error, isOpen, meta} = context;
  const {onCancel, onOk, onChange, handleAdd, handleEdit} = useCrud(send, record);
  const columnsSchema = meta.columnsSchema || {};
  const fieldsSchema = meta.fieldsSchema || {};

  const saloneSections = [ 
    {
      title: "Файлы",
      Component: SaloneFiles
    },
  ];

  const showSection = ({index, id, slug, title}) => {
    const props = {
      sectionId: index,
      key: index,
      baseZIndex: 0,
      dialogId: "Section",
      title: title,
      slug,
      id
    };

    store.sidebars = store.sidebars || [];
    store.sidebars.push({Component: renderSidebar, props});
  };

  const hideSection = (dialogId) => {
    store.sidebars = store.sidebars || [];
    store.sidebars = store.sidebars.filter(s => s.props.dialogId !== dialogId);
  };

  const renderSidebar = (props) => {
    const {baseZIndex, sectionId, dialogId, title} = props;
    const section = saloneSections[sectionId];
    const Component = section && section.Component;
    return (
      <Dialog header={title} contentClassName="flex-1" visible={true} baseZIndex={baseZIndex} dismissableMask modal style={{width: "90vw", height: "50vh"}}  onHide={() => hideSection(dialogId) }>
        {Component && <Component {...props}/>}
      </Dialog>
    );
  };

  useEffect(() => {
    send("load");
  },[]);

  const onRowExpand = () => {
  };

  const rowExpansionTemplate = ({id, slug}) => {
    return (
      <div style={{width: "100%", overflowX: "auto"}}>
        {
          saloneSections.map(({title}, i) => <div className="inline mr-5"  key={i}><Button className="p-button-outlined p-button-sm p-button-text"  label={title} onClick={() => showSection({id, index: i, title, slug})}/></div>)
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
    asyncPut(`api/admin/salones/${record.id}`, {...record, [fieldName]: value}).fork(saveFailed, saveOk);
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
    return {};
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
        <Button onClick={handleAdd}>{t("add")}</Button>
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
