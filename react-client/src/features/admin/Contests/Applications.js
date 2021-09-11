import React, {useState} from "react";
import Grid from "../../../components/Crud/Grid";
import CrudMachine from "../../machines/CrudMachine";
import { Toolbar } from "primereact/toolbar";
import {Button} from "primereact/button";
import {asyncPost} from "../../../core/api";
import {all} from "crocks/Async";


const TBar = ({selection, refresh}) => {
  const approveFailed = () => {

  };

  const approveOk = d => {
    refresh();
  };

  const approve = () => {
    asyncPost("api/admin/applications/approve", {ids: selection.map(e => e.id)}).fork(approveFailed, approveOk);
  };

  const left = (
    <Button label="Согласовать" icon="pi pi-check" className="mr-2" onClick={approve} />
  );

  return (
    <Toolbar left={left}/>
  );
};

export default ({id}) => {


  const machine = CrudMachine({api: "api/admin/applications", apiParams: {contestId: id}, apiMetaParams: {id}});
  const G = Grid({machine, canDelete: false, canEdit: true, canAdd: false, hasCheck: true, Toolbar: TBar });
  return (
    <G/>
  );
};
