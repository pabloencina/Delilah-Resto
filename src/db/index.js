import { Sequelize } from "sequelize";
import {
    config_db_db_name,
    config_db_pass,
    config_db_user,
} from "../../configDB.js";

const sequelizeObject = new Sequelize(
    config_db_db_name,
    config_db_user,
    config_db_pass,
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

sequelizeObject.authenticate().then(() => {
    console.log("conexión exitosa...")
}).catch(e => {
    console.error(e.message)
})

export default sequelizeObject;