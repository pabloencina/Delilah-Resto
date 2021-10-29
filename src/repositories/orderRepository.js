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


export const findOrdersByCustomerDB = async (customerId) => {

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
            "SELECT * FROM `Order` WHERE orderId = ?",
            { type: db.QueryTypes.SELECT, replacements: [orderId] }
        )

        if (order.length == 0) {
            return null;
        }
        return order[0];

    } catch (error) {

        console.error(error.message);
        throw error;

    }
}

export const findOrderDetailsbyOrderIdsDB = async (orderIds) => {

    try {

        const orderDetail = await db.query(
            "SELECT * FROM OrderDetail ord WHERE ord.orderId IN (?)",
            { type: db.QueryTypes.SELECT, replacements: [orderIds] }
        )

        return orderDetail

    } catch (error) {

        console.error(error.message);
        throw error;

    }

}

