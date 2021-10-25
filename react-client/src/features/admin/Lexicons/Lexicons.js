import React, {useState, useEffect} from "react";
import G from "../../../components/Crud/Grid";
import CrudMachine from "../../machines/CrudMachine";

const rowExpansionTemplate = ({id}) => {
  const machine = CrudMachine({api: "api/admin/phrases", apiParams: {id}});
  const Grid = G({machine});
  return <Grid/>;
};

// const rowExpansionTemplate = ({id}) => {
//   return (
//     <div>
//       {id}

//     </div>
//   );
// };


export default function() {
  const machine = CrudMachine({api: "api/admin/lexicons"});
  const Grid = G({machine, rowExpansionTemplate });
  return <Grid/>;
}


// import {Button} from "primereact/button";
// import { DataTable } from "primereact/datatable";
// import { Column } from "primereact/column";
// import { useTranslation } from "react-i18next";
// import Form from "../../../components/Crud/Form";
// import Machine from "../../../features/machines/CrudMachine";
// import useCrud from "../../../core/hooks/useCrud";
// import {useMachine} from "@xstate/react";

// export default function LexiconsGrid() {
//   const { t } = useTranslation("namespace1");
//   const [expandedRows, setExpandedRows] = useState([]);
//   const [current, send] = useMachine(Machine({api: "api/admin/lexicons"}));
//   const {context} = current;
//   const {records, record, error, isOpen, meta} = context;
//   const {onCancel, onOk, onChange, handleEdit, handleAdd} = useCrud(send, record);
 

//   useEffect(() => {
//     send("load");
//   },[]);

//   const rowExpansionTemplate = ({id}) => {
//     const Grid = G({api: "api/admin/phrases", apiParams: {id}});
//     return <Grid/>;
//   };

//   return (
//     <>
//       <div className="mb-4">
//         <Button onClick={handleAdd}>{t("add")}</Button>
//       </div>
//       <DataTable 
//         value={records}
//         expandedRows={expandedRows}
//         onRowToggle={e => setExpandedRows(e.data)}
//         rowExpansionTemplate={rowExpansionTemplate}
//       >
//         <Column expander style={{ width: "3em" }} />
//         <Column field="code" header="code"></Column>
//         <Column field="category" header="category"></Column>
//       </DataTable>

//       {
//         isOpen && <Form fields={meta.fields} saveError={error} record={record} visible={isOpen} onCancel={onCancel} onOk={onOk} onChange={onChange}/> 
//       }
//     </>
//   );
// }

