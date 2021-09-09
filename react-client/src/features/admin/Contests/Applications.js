import React, {useState} from "react";
import Grid from "../../../components/Crud/Grid";
import {Button} from "primereact/button";



export default ({id}) => {
  const [regState, setRegState] = useState({});

  const approve = id => {
    console.log(id);
  };

  const foo =  () => {
    console.log("REF");
  };

  const customOperations = [
    record => <Button icon="pi pi-link" onClick={() => approve(record.id)} className="p-button-rounded" />
  ];
  const G = Grid({api: "api/admin/applications", apiParams: {contestId: id}, customOperations, setRefresh: foo});
  return <G/>;
};
