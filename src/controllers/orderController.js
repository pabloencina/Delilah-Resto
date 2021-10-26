//import { Order } from "../entities/order.js"

//import { User } from "../entities/user.js"

//import { InvalidIdError, InvalidObjectError } from "../error.js"

import {
    findAllOrdersDB,
    getOrdersByCustomerDB,
    // findOrderByIdDB
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

    console.log("hola!")
    try {

        const customerId = validateId(request.params.customerId)
        console.log(customerId)
        let ordersByCustomer = await getOrdersByCustomerDB(customerId)

        response.status(200).json(ordersByCustomer)
        console.log(ordersByCustomer)

    } catch (error) {

        response.status(500).json({ error: "Try later..." })

    }

}


export const getOrderById = async (request, response) => {

    try {

        const customerId = validateId(request.params.customerId)

        const customerDB = await findCustomerByIdDB(customerId)

        if (customerDB === null) {
            response.status(404).json({ error: "Can't find customer.customerId = " + customerId });
        }

        response.status(200).json(customerDB);

    } catch (error) {

        response.status(500).json({ error: "Try later..." })

    }

}