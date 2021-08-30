import { Sequelize } from "sequelize";

const user = "delilah-resto";
const db = "delilah-resto";
const pass = "password1234";
const sequelizeObject = new Sequelize(db, user, pass, {
    host: 'localhost',
    dialect: 'mysql'
});

sequelizeObject.authenticate().then(() => {
    console.log("conexión exitosa...")
}).catch(e => {
    console.error(e.message)
})

export default sequelizeObject;