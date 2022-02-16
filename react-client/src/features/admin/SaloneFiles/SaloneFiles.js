import React from "react";
import Grid from "../../../components/Crud/Grid";
import CrudMachine from "../../machines/CrudMachine";

const delRecordToParams = (api, record) => api + "/" + record.id + "/" + record.slug;
export default (record) => {
  const machine = CrudMachine({api: "api/admin/saloneFiles", apiParams: {saloneId: record.id, slug: record.slug}, delRecordToParams});
  const G = Grid({machine});
  return <G/>;
};

