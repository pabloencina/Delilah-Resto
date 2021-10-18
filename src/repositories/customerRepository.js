import db from '../db/index.js'

export const findAllCustomersDB = async () => {
    
    try {

        const customersDB = await db.query(
            "SELECT cu.customerId, cu.address, us.userId, us.name, us.surname, us.email, us.phone FROM Customer cu  JOIN User us ON cu.userId = us.userId LIMIT 0, 1000",
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

/*
export const updateProductDB = async (productId, product) => {

    try {

        const result = await db.query(
            "UPDATE Product SET productNumber = ?, productName = ?, productPrice = ?, productPhoto = ? WHERE productId = ?",
            {
                type: db.QueryTypes.UPDATE,
                replacements: [product.productNumber, product.productName, product.productPrice, product.productPhoto, productId],
            }
        );
        console.log(result)
        return result;

    } catch (error) {

        console.error(error.message);
        throw error;
    }
}


export const deleteProductDB = async (productId) => {

    try {

        const result = await db.query(
            "DELETE FROM Product WHERE productId = ?",
            { type: db.QueryTypes.DELETE, replacements: [productId] }
        );

        return result;

    } catch (error) {

        console.error(error.message);
        throw error;
    }
}
*/