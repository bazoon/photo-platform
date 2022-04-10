import React from "react";
import Grid from "../../../components/Crud/Grid";
import CrudMachine from "../../machines/CrudMachine";
import useAuth from "../../../core/hooks/useAuth";
import {collect} from "react-recollect";

const W = props => {
  const machine = CrudMachine({
    api: "api/admin/saloneSettings",
    width: 3000,
  });

  const {can} = useAuth(props.store.permissions);
  const G = Grid({
    width: "100%", 
    title: "settings", 
    machine, 
    canEdit: can([
      "saloneSettings.update", 
      "domain.saloneSettings.update.0",
      "domain.saloneSettings.update.1", 
      "domain.saloneSettings.update.2",
      "domain.saloneSettings.update.3"
    ]), 
    canDelete: can(["saloneSettings.delete", "domain.saloneSettings.delete"]),
    canAdd: can(["saloneSettings.add", "domain.saloneSettings.add"])
  });
  return <G/>;
};

export default collect(W);

