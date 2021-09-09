import React from "react";
import Grid from "../../../components/Crud/Grid";
import CrudMachine from "../../machines/CrudMachine";
export default ({id}) => {
  const machine = CrudMachine({api: "api/admin/juries", apiParams: {contestId: id}});
  const G = Grid({machine});
  return <G/>;
};
