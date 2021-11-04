import { Order } from "../entities/order.js";

import { OrderDetail } from "../entities/orderDetail.js"

import {
    findAllOrdersDB,
    findOrderByIdDB,
    findOrderDetailsbyOrderIdsDB,
    findOrdersByCustomerDB,
    saveOrder,
    //updateOrderByCustomerIdDB
} from "../repositories/orderRepository.js"

import { InvalidIdError, InvalidObjectError } from "../error.js";

import { validateId } from "./idValidator.js";


export const getOrders = async (request, response) => {

    try {

        let orders = await findAllOrdersDB();
        //Buscar todos los usuarios 
        //En bucle recorrer todos los customers y agregarle el usuario que corresponde
        response.status(200).json(orders);

    } catch (error) {

        response.status(500).json({ error: "Try later..." })

    }
}


export const getOrdersByCustomer = async (request, response) => {


    try {

        const customerId = validateId(request.params.customerId)

        let ordersByCustomer = await findOrdersByCustomerDB(customerId)
        //Construir un array con todos los orderId para buscar en la base de datos todos orderDtails que corrsponden. 
        let orderIds = []

        for (let i = 0; i < ordersByCustomer.length; i++) {

            orderIds.push(ordersByCustomer[i].orderId)

        }
        //llamar la funcion de base de datos que devuelve las OrderDetails.
        let orderDetails = await findOrderDetailsbyOrderIdsDB(orderIds)
        //Realcionar los Orderdetails con el Order que correspnde.
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

        response.status(500).json({ error: "Try later..." })

    }

}


export const getOrderById = async (request, response) => {

    try {

        const orderId = validateId(request.params.orderId)

        const orderByIdDB = await findOrderByIdDB(orderId)

        if (orderByIdDB === null) {

            response.status(404).json({ error: "Can't find order.customerId = " + orderId });

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

        response.status(500).json({ error: "Try later..." })

    }

}

//ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
export const postOrderByCustomerId = async (request, response) => {

    try {

        const body = request.body;

        Order.validate(body);
        // Hacer una función del product repository que traiga todos los product ID (array)


        for (let i = 0; i < body.orderDetails.length; i++) {

            OrderDetail.validate(body.orderDetails[i]);
            // verificar que el productId del orderDetail[i] esté dentro de ese array 
            // so da false response.status(409).("message") con el mensaje correspodiente
        }
        const currentDateTime = new Date();
        console.log(currentDateTime)
        const order = new Order(body.orderNumber, body.description, body.address, body.totalPrice, request.params.customerId, body.paymentMethod, 'NEW', body.orderDetails, currentDateTime)

        let orderSaved = await saveOrder(order);

        response.status(200).json(orderSaved);

    } catch (error) {

        if (error instanceof InvalidIdError) {
            response.status(400).json({ error: error.message });

        } else if (error instanceof InvalidObjectError) {
            response.status(400).json({ error: error.message });

        } else {
            response.status(500).json({ error: error.message });
        }

    }
}

//wertwertwertwertwertwertwertwertwertwertwetwetwertwertwertwertwert
export const putOrderByCustomerId = async (request, response) => {

    try {

        const customerId = validateId(request.params.customerId);

        const customerDB = await findProductByIdDB(customerId);

        if (customerDB === null) {
            response.status(404).json({ error: "Can't find product.productId = " + customerId });
        }
        // validar el producto que viene en el body del servicio
        // crear el objeto producto
        // mandarselo al updateProductDB como parametro
        // Verificar con en Postman y con la BD (delfin), que la actualización se esté haciendo correctamente.
        const body = request.body;

        Order.validate(body);

        const order = new Order(body.orderId, body.orderNumber, body.description, body.address, body.totalPrice, body.paymentMethod, body.orderState, body.customerId);

        await updateProductDB(customerId, order);

        response.status(200).json({ message: "Order(" + customerId + ") updated successfully." });

    } catch (error) {

        if (error instanceof InvalidIdError) {
            response.status(400).json({ error: error.message });
        } else if (error instanceof InvalidObjectError) {
            response.status(400).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }
    }
}