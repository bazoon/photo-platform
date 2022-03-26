import React from "react";
import Grid from "../../../components/Crud/Grid";
import CrudMachine from "../../machines/CrudMachine";
import useAuth from "../../../core/hooks/useAuth";
import {collect} from "react-recollect";

const W = props => {
  const machine = CrudMachine({api: "api/admin/juries", apiParams: {contestId: props.id}});
  const {can} = useAuth(props.store.permissions);
  const G = Grid({width: "100%", title: "jury", machine, canEdit: can(["jury.update"]), canDelete: can(["jury.delete"])});
  return <G/>;
};

export default collect(W);


