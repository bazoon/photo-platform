import Grid from "../../../components/Crud/Grid";
import Machine from "../../../features/machines/CrudMachine";
const machine = Machine({api: "api/admin/users"});
export default Grid({width: 3000, title: "users", machine});
