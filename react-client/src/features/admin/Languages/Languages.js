import Grid from "../../../components/Crud/Grid";
import CrudMachine from "../../machines/CrudMachine";
const machine = CrudMachine({api: "api/admin/languages"});
export default Grid({machine});
