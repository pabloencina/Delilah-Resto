import { Order } from "../entities/order.js"

import { User } from "../entities/user.js"

import { InvalidIdError, InvalidObjectError } from "../error.js"

import {
    findAllOrdersDB
    //findCustomerByIdDB,
    //findCustomerByUserIdDB,
    //saveCustomerDB,
    //updateProductDB,
    //deleteProductDB,
    //findProductByIdDB
} from "../repositories/orderRepository.js"

import { saveUserDB } from "../repositories/userRepository.js";
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

export const getOrderByCustomer = async (request, response) => {

}