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
//fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff

export const saveOrder = async (order) => {

    try {

        const responseDB = await db.query(

            "INSERT INTO `Order` (orderNumber, description, address, totalPrice, customerId, paymentMethod, orderState, orderCreateDateTime) values(?,?,?,?,?,?,?,?)",

            {
                type: db.QueryTypes.INSERT,
                replacements: [order.orderNumber, order.description, order.address, order.totalPrice, order.customerId, order.paymentMethod, order.orderState, order.orderCreateDateTime],
            }

        );
        order.orderId = responseDB[0];

        console.log(order.orderDetails);

        for (let i = 0; i < order.orderDetails.length; i++) {

            const responseDB = await db.query(

                "INSERT INTO OrderDetail (productPrice, productQuantity, productId, orderId) values(?,?,?,?)",

                {
                    type: db.QueryTypes.INSERT,
                    replacements: [order.orderDetails[i].productPrice, order.orderDetails[i].productQuantity, order.orderDetails[i].productId, order.orderId],
                }

            );

            order.orderDetails[i].orderDetailId = responseDB[0];
            console.log(order.orderDetails[i].orderDetailId = responseDB[0])

        }

        return order;

    } catch (error) {

        console.error(error.message);

        throw error;
    }

}
//wretwertwertwertwertwertwertwertwertwertwetrwertwertwertwertwertwertwert

export const updateOrderByCustomerIdDB = async (customerId,order) => {

    try {

        const result = await db.query(
            "UPDATE `Order` SET orderNumber = ?, description = ?, address = ?, totalPrice = ?, paymentMethod = ?, orderState = ?,  WHERE customerId = ?",
            {
                type: db.QueryTypes.UPDATE,
                replacements: [order.orderNumber, order.description, order.address, order.totalPrice, order.paymentMethod, order.orderState, customerId],
            }
        );
        console.log(result)
        return result;

    } catch (error) {

        console.error(error.message);
        throw error;
    }
}

export const updateOrderByIdDB = async (orderId) => {

    try {

        const result = await db.query(
            "UPDATE `Order` SET orderNumber = ?, description = ?, address = ?, totalPrice = ?, paymentMethod = ?, orderState = ?,  WHERE orderId = ?",
            {
                type: db.QueryTypes.UPDATE,
                replacements: [order.orderNumber, order.description, order.address, order.totalPrice, order.paymentMethod, order.orderState, orderId],
            }
        );
        console.log(result)
        return result;

    } catch (error) {

        console.error(error.message);
        throw error;
    }
}