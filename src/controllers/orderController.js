//import { Order } from "../entities/order.js"

//import { User } from "../entities/user.js"

//import { InvalidIdError, InvalidObjectError } from "../error.js"

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
        console.log(ordersByCustomer)
        //Construir un array con todos los orderId para buscar en la base de datos todos orderDtails que corrsponden. 
        let orderIds = []
        for (let i = 0; i < ordersByCustomer.length; i++) {

            const element = ordersByCustomer[i]
            orderIds.push(element.orderId)
            
        }
        console.log(orderIds)
         
        //llamar la funcion de base de datos que devuelve las OrderDetails.

        //let orderByOrderDetails = await findOrderDetailsbyOrderIdsDB(orderIds)

        //Realcionar los Orderdetails con el Order que correspnde.

        response.status(200).json(ordersByCustomer)

    } catch (error) {

        response.status(500).json({ error: "Try later..." })

    }

}


export const getOrderById = async (request, response) => {

    try {

        const customerID = validateId(request.params.customerId)

        const orderByIdDB = await findOrderByIdDB(customerID)

        if (orderByIdDB === null) {
            response.status(404).json({ error: "Can't find order.customerId = " + orderId });
        }

        response.status(200).json(orderByIdDB);

    } catch (error) {

        response.status(500).json({ error: "Try later..." })

    }

}