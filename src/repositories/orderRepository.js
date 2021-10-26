import db from '../db/index.js'

export const findAllOrdersDB = async () => {

    try {

        const ordersDB = await db.query(
            "SELECT ord.orderId, ord.orderNumber, ord.description, ord.address, ord.totalPrice, cu.customerId, ord.paymentMethod, ord.orderState FROM `Order` ord JOIN Customer cu ON ord.customerId = cu.customerId LIMIT 0, 1000",
            { type: db.QueryTypes.SELECT }
        );
        console.log(ordersDB);
        return ordersDB;

    } catch (error) {

        console.error(error.message);
        throw error;

    }

}


export const getOrdersByCustomerDB = async (customerId) => {

    try {
        
        const orders = await db.query(
            "SELECT * FROM `Order` WHERE CustomerId = ? ",
            { type: db.QueryTypes.SELECT, replacements: [customerId] }
        );

        return orders;

    } catch (error) {

        console.error(error.message);
        throw error;

    }

}


export const findOrderByIdDB = async (orderId) => {

    try {

        const order = await db.query(
            "SELECT * FROM Order WHERE orderId = ?",
            { type: db.QueryTypes.SELECT, replacements: [orderId] }
        )

        if (order.length == 0) {
            return null;
        }

        return order

    }catch (error){

        console.error(error.message);
        throw error;

    }
}

