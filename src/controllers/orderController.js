//import { Order } from "../entities/order.js"

//import { User } from "../entities/user.js"

//import { InvalidIdError, InvalidObjectError } from "../error.js"

import { OrderDetails } from "../entities/orderDetails.js";
import {
    findAllOrdersDB,
    findOrderByIdDB,
    findOrderDetailsbyOrderIdsDB,
    findOrdersByCustomerDB
} from "../repositories/orderRepository.js"

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

        //ffffffffffffffffffffffffffffffffffffffffffffffffffff
        let orderIds = []

        let orderDetail = [];

        let orderDetails = await findOrderDetailsbyOrderIdsDB(orderIds)

        for (let i = 0; i < orderDetails.length; i++) {

            if (orderDetails[i].orderId === orderByIdDB.orderId) {
                console.log(orderDetails[i].orderId)
                orderDetail.push(orderDetails[i]);

            }

            orderByIdDB.OrderDetails = orderDetail

        }

        response.status(200).json(orderByIdDB);

    } catch (error) {

        response.status(500).json({ error: "Try later..." })

    }

}