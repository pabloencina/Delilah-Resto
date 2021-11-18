import { Order } from "../entities/order.js";

import { OrderDetail } from "../entities/orderDetail.js"

import {
    cancelOrderByOrderIdDB,
    preparedOrderByOrderIdDB,
    confirmOrderByOrderIdDB,
    deliverOrderByOrderIdDB,
    sentOrderByOrderIdDB,
    findAllOrdersDB,
    findOrderByIdDB,
    findOrderDetailsbyOrderIdsDB,
    findOrdersByCustomerDB,
    saveOrder,
    deleteOrderDB
} from "../repositories/orderRepository.js"

import { findAllProductIdDB } from "../repositories/productRepository.js";

import {
    InvalidIdError,
    InvalidObjectError,
    BusinessError,
    NotFoundError
} from "../error.js";

import { validateId } from "./idValidator.js";


export const getOrders = async (request, response) => {

    try {

        let ordersDB = await findAllOrdersDB();


        let orderIds = []
        //Construir un array con todos los orderId para buscar en la base de datos todos orderDtails que corrsponden. 
        for (let i = 0; i < ordersDB.length; i++) {

            orderIds.push(ordersDB[i].orderId)

        }
        //llamar la funcion de base de datos que devuelve las OrderDetails.
        let orderDetails = await findOrderDetailsbyOrderIdsDB(orderIds)
        //Realcionar los Orderdetails con el Order que correspnde.
        for (let j = 0; j < ordersDB.length; j++) {

            let orderDetail = [];

            for (let i = 0; i < orderDetails.length; i++) {

                if (orderDetails[i].orderId === ordersDB[j].orderId) {
                    orderDetail.push(orderDetails[i]);
                }

            }

            ordersDB[j].orderDetails = orderDetail;

        }

        response.status(200).json(ordersDB);

    } catch (error) {


        if (error instanceof InvalidIdError) {
            response.status(400).json({ error: error.message });

        } else if (error instanceof InvalidObjectError) {
            response.status(400).json({ error: error.message });

        } else if (error instanceof BusinessError) {
            response.status(409).json({ error: error.message });

        } else {
            response.status(500).json({ error: error.message });
        }

    }
}


export const getOrdersByCustomer = async (request, response) => {


    try {

        const customerId = validateId(request.params.customerId)

        let ordersByCustomer = await findOrdersByCustomerDB(customerId)

        let orderIds = []

        for (let i = 0; i < ordersByCustomer.length; i++) {

            orderIds.push(ordersByCustomer[i].orderId)

        }

        let orderDetails = await findOrderDetailsbyOrderIdsDB(orderIds)

        for (let j = 0; j < ordersByCustomer.length; j++) {

            let orderDetail = [];

            for (let i = 0; i < orderDetails.length; i++) {

                if (orderDetails[i].orderId === ordersByCustomer[j].orderId) {
                    orderDetail.push(orderDetails[i]);
                }

            }

            ordersByCustomer[j].orderDetails = orderDetail;

        }

        response.status(200).json(ordersByCustomer)

    } catch (error) {


        if (error instanceof InvalidIdError) {
            response.status(400).json({ error: error.message });

        } else if (error instanceof InvalidObjectError) {
            response.status(400).json({ error: error.message });

        } else if (error instanceof BusinessError) {
            response.status(409).json({ error: error.message });

        } else {
            response.status(500).json({ error: error.message });
        }

    }

}


export const getOrderById = async (request, response) => {

    try {

        const orderId = validateId(request.params.orderId)

        const orderByIdDB = await findOrderByIdDB(orderId)

        if (orderByIdDB === null) {

            throw new NotFoundError("Can't find order.Id = " + orderId)

        }

        let orderDetails = await findOrderDetailsbyOrderIdsDB(orderId)

        let orderDetail = [];

        for (let i = 0; i < orderDetails.length; i++) {

            if (orderDetails[i].orderId === orderByIdDB.orderId) {

                orderDetail.push(orderDetails[i]);

            }

        }

        orderByIdDB.orderDetails = orderDetail;

        response.status(200).json(orderByIdDB);

    } catch (error) {

        if (error instanceof InvalidIdError) {
            response.status(400).json({ error: error.message });

        } else if (error instanceof InvalidObjectError) {
            response.status(400).json({ error: error.message });

        } else if (error instanceof BusinessError) {
            response.status(409).json({ error: error.message });

        } else {
            response.status(500).json({ error: error.message });
        }

    }

}

export const postOrderByCustomerId = async (request, response) => {

    try {

        const body = request.body;

        Order.validate(body);

        const productIds = await findAllProductIdDB()

        for (let i = 0; i < body.orderDetails.length; i++) {

            OrderDetail.validate(body.orderDetails[i]);
            if (!productIds.includes(body.orderDetails[i].productId)) {
                throw new BusinessError("ProductId = " + body.orderDetails[i].productId + " does not exist in the dataBase.");
            }

        }

        const currentDateTime = new Date();

        const order = new Order(body.orderNumber, body.description, body.address, body.totalPrice, request.params.customerId, body.paymentMethod, 'NEW', body.orderDetails, currentDateTime)

        let orderSaved = await saveOrder(order);

        response.status(201).json(orderSaved);

    } catch (error) {

        if (error instanceof InvalidIdError) {
            response.status(400).json({ error: error.message });

        } else if (error instanceof InvalidObjectError) {
            response.status(400).json({ error: error.message });

        } else if (error instanceof BusinessError) {
            response.status(409).json({ error: error.message });

        } else {
            response.status(500).json({ error: error.message });
        }

    }
}


export const putOrderByCustomerId = async (request, response) => {

    try {

        const orderId = validateId(request.params.orderId);

        const orderDB = await findOrderByIdDB(orderId);

        if (orderDB === null) {
            throw new NotFoundError("Can't find order.orderId = " + orderId);
        }


        if (request.body.orderState === "CANCELLED" && orderDB.orderState != "DELIVERED") {
            const orderToCancel = await cancelOrderByOrderIdDB(orderId, "CANCELLED", new Date());
            response.status(201).json(orderToCancel);
        } else {
            throw new BusinessError("Invalid state transition: " + orderDB.orderState + " -> " + request.body.orderState)
        }


    } catch (error) {

        if (error instanceof InvalidIdError) {
            response.status(400).json({ error: error.message });
        } else if (error instanceof InvalidObjectError) {
            response.status(400).json({ error: error.message });
        } else if (error instanceof NotFoundError) {
            response.status(404).json({ error: error.message });
        } else if (error instanceof BusinessError) {
            response.status(409).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

export const putOrder = async (request, response) => {

    try {

        const orderId = validateId(request.params.orderId);

        const orderDB = await findOrderByIdDB(orderId);

        if (orderDB === null) {
            throw new NotFoundError("Can't find order.orderId = " + orderId);
        }


        if (request.body.orderState === "CONFIRMED") {

            if (orderDB.orderState === "NEW") {
                const orderToConfirm = await confirmOrderByOrderIdDB(orderId, "CONFIRMED", new Date());
                response.status(201).json(orderToConfirm);
            } else {
                throw new BusinessError("Invalid state transition: " + orderDB.orderState + " -> " + request.body.orderState)
            }

        }


        if (request.body.orderState === "PREPARED") {

            if (orderDB.orderState === "CONFIRMED") {
                const orderToPrepar = await preparedOrderByOrderIdDB(orderId, "PREPARED", new Date());
                response.status(201).json(orderToPrepar);
            } else {
                throw new BusinessError("Invalid state transition: " + orderDB.orderState + " -> " + request.body.orderState)
            }

        }


        if (request.body.orderState === "SENT") {

            if (orderDB.orderState === "PREPARED") {
                const orderToSent = await sentOrderByOrderIdDB(orderId, "SENT", new Date());
                response.status(201).json(orderToSent);

            } else {
                throw new BusinessError("Invalid state transition: " + orderDB.orderState + " -> " + request.body.orderState)
            }

        }

        if (request.body.orderState === "DELIVERED") {

            if (orderDB.orderState === "SENT") {
                const orderToDeliver = await deliverOrderByOrderIdDB(orderId, "DELIVERED", new Date());
                response.status(201).json(orderToDeliver);
            } else {
                throw new BusinessError("Invalid state transition: " + orderDB.orderState + " -> " + request.body.orderState)
            }

        }


        if (request.body.orderState === "CANCELLED" && orderDB.orderState != "DELIVERED") {
            const orderToCancel = await cancelOrderByOrderIdDB(orderId, "CANCELLED", new Date());
            response.status(201).json(orderToCancel);
        } else {
            throw new BusinessError("Invalid state transition: " + orderDB.orderState + " -> " + request.body.orderState)
        }


    } catch (error) {

        if (error instanceof InvalidIdError) {
            response.status(400).json({ error: error.message });
        } else if (error instanceof InvalidObjectError) {
            response.status(400).json({ error: error.message });
        } else if (error instanceof NotFoundError) {
            response.status(404).json({ error: error.message });
        } else if (error instanceof BusinessError) {
            response.status(409).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}

export const deleteOrder = async (request, response) => {

    try {

        const orderId = validateId(request.params.orderId);

        const orderDB = await findOrderByIdDB(orderId);

        if (orderDB === null) {
            throw new NotFoundError("Can't find order.orderId = " + orderId);
        }

        await deleteOrderDB(orderId);

        response.status(200).json({ message: "Order(" + orderId + ") deleted successfully." });

    } catch (error) {

        if (error instanceof InvalidIdError) {
            response.status(400).json({ error: error.message });
        } else if (error instanceof NotFoundError) {
            response.status(404).json({ error: error.message })
        } else {
            response.status(500).json({ error: error.message });
        }

    }
}