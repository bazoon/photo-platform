import CrudMachine from "../../machines/CrudMachine";
import Grid from "../../../components/Crud/Grid";
import React from "react";
import useAuth from "../../../core/hooks/useAuth";
import {collect} from "react-recollect";

const W = props => {
  const machine = CrudMachine({
    api: "api/admin/settings",
    width: 3000,
  });

  const {can} = useAuth(props.store.permissions);
  const G = Grid({
    width: "100%", 
    title: "settings", 
    machine, 
    canEdit: can(["settings.update", "domain.settings.update.0", "domain.settings.update.1", "domain.settings.update.2", "domain.settings.update.3"]), 
    canDelete: can(["settings.delete", "domain.settings.delete"]),
    canAdd: can(["settings.add", "domain.settings.add"])
  });
  return <G/>;
};

export default collect(W);



