// import React from "react";
// import Grid from "../../../components/Crud/Grid";
// export default ({id}) => {
//   const G = Grid({api: "api/admin/nominations", apiParams: {contestId: id}});
//   return <G/>;
// };

import React, {useState, useEffect} from "react";
import {Button} from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useTranslation } from "react-i18next";
import Form from "../../../components/Crud/Form";
import Machine from "../../../features/machines/CrudMachine";
import useCrud from "../../../core/hooks/useCrud";
import G from "../../../components/Crud/Grid";
import {useMachine} from "@xstate/react";

export default function NominationsGrid({id}) {
  const { t } = useTranslation("namespace1");
  const [expandedRows, setExpandedRows] = useState([]);
  const [current, send] = useMachine(Machine({api: "api/admin/nominations", apiParams: {id}}));
  const {context} = current;
  const {records, record, error, isOpen, meta} = context;
  const {onCancel, onOk, onChange, handleEdit, handleAdd} = useCrud(send, record);
 



  useEffect(() => {
    send("load");
  },[]);


  const rowExpansionTemplate = ({id}) => {
    const Grid = G({api: "api/admin/nominationSections", apiParams: {id}});
    return <Grid/>;
  };

  const loadSections = ({id}) => {
    console.log(id);
  };


  const customOperations = [
    record => <Button icon="pi pi-link" onClick={_ => loadSections(record) } className="p-button-rounded" />
  ];

  const Grid = G({api: "api/admin/nominations", customOperations,  width: "100%", apiParams: {id}});

  return (
    <>
      <Grid/>
    </>
  );
}

