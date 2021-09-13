import db from '../db/index.js';

/*
export const findAllCustomersDB = async () => {
    
    try {

        const customersDB = await db.query(
            "SELECT * FROM Customer",
            { type: db.QueryTypes.SELECT }
        );
        console.log(customersDB);
        return customersDB;

    } catch (error) {

        console.error(error.message);
        throw error;

    }
}


export const findCustomerByIdDB = async (customerId) => {

    try {

        const customer = await db.query(
            "SELECT * FROM Customer WHERE customerId = ?",
            { type: db.QueryTypes.SELECT, replacements: [customerId] }
        );

        if (customer.length == 0) {
            return null;
        }

        return customer ;

    } catch (error) {

        console.error(error.message);
        throw error;

    }
}
*/

export const saveUserDB = async (user) => {

    try {

        const responseDB = await db.query(
            "INSERT INTO User (userId, name, surname, email, phone, password) values(?,?,?,?,?,?)",
            {
                type: db.QueryTypes.INSERT,
                replacements: [null, user.name, user.surname, user.email, user.phone, user.password],
            }
        );
        user.userId = responseDB[0];
        return user;

    } catch (error) {

        console.error(error.message);
        throw error;
    }
}
