import React from "react";
import Grid from "../../../components/Crud/Grid";
export default ({id}) => {
  const G = Grid({api: "api/admin/contestsAbout", apiParams: {contestId: id}});
  return <G/>;
};
