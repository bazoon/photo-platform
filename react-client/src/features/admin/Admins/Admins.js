import Grid from "../../../components/Crud/Grid";
import React from "react";
import CrudMachine from "../../machines/CrudMachine";
import {collect} from "react-recollect";
import useAuth from "../../../core/hooks/useAuth";

const machine = CrudMachine({api: "api/admin/admins"});

const W = props => {
  const machine = CrudMachine({api: "api/admin/admins"});
  const {can} = useAuth(props.store.permissions);
  const G = Grid({
    width: "100%", 
    title: "admins",
    machine, 
    canEdit: can(["admins.update", "domain.admins.update", "moders.update", "domain.moders.update"]), 
    canDelete: can(["admin.update"])
  });

  return <G/>;
};

export default collect(W);




