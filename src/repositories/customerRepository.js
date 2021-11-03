import db from '../db/index.js'

export const findAllCustomersDB = async () => {

    try {

        const customersDB = await db.query(
            "SELECT cu.customerId, cu.address, us.userId, us.name, us.surname, us.email, us.phone, us.password FROM Customer cu  JOIN User us ON cu.userId = us.userId LIMIT 0, 1000",
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

        return customer[0];

    } catch (error) {

        console.error(error.message);
        throw error;

    }
}

export const findCustomerByUserIdDB = async (userId) => {

    try {

        const customer = await db.query(
            "SELECT * FROM Customer WHERE userId = ?",
            { type: db.QueryTypes.SELECT, replacements: [userId] }
        );

        if (customer.length == 0) {
            return null;
        }

        return customer[0];

    } catch (error) {

        console.error(error.message);
        throw error;

    }

}


export const saveCustomerDB = async (customer) => {

    try {

        const responseDB = await db.query(
            "INSERT INTO Customer (customerId, address, userId) values(?,?,?)",
            {
                type: db.QueryTypes.INSERT,
                replacements: [null, customer.address, customer.user.userId],
            }
        );
        customer.customerId = responseDB[0];
        return customer;

    } catch (error) {

        console.error(error.message);
        throw error;
    }
}

