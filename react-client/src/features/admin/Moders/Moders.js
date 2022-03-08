import React from "react";
import Grid from "../../../components/Crud/Grid";
import CrudMachine from "../../machines/CrudMachine";
import useAuth from "../../../core/hooks/useAuth";
import {collect} from "react-recollect";
const machine = CrudMachine({api: "api/admin/moders"});

const W = props => {
  const {can} = useAuth(props.store.permissions);
  const G = Grid({width: "100%", title: "moders", machine, canEdit: can(["moders.update"]), canDelete: can(["moders.delete"])});
  return <G/>;
};

export default collect(W);


