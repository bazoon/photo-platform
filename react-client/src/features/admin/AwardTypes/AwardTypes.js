import Grid from "../../../components/Crud/Grid";
import CrudMachine from "../../machines/CrudMachine";
const machine = CrudMachine({api: "api/admin/awardTypes"});
export default Grid({machine});
