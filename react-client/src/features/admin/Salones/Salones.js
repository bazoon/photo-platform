import Grid from "../../../components/Crud/Grid";
import CrudMachine from "../../machines/CrudMachine";
const machine = CrudMachine({api: "api/admin/salones"});
export default Grid({machine, width: 3000});
