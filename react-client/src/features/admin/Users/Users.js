import React from "react";
import Grid from "../../../components/Crud/Grid";
import Machine from "../../../features/machines/CrudMachine";
import {collect} from "react-recollect";
import useAuth from "../../../core/hooks/useAuth";
const machine = Machine({api: "api/admin/users"});

const W = props => {
  const {can} = useAuth(props.store.permissions);
  const G = Grid({width: 3000, title: "users", machine, canEdit: can(["users.update"]), canDelete: can(["users.delete"])});
  return <G/>;
};

export default collect(W);

