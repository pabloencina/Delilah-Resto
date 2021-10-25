import { Customer } from "../entities/customer.js"

import { User } from "../entities/user.js"

import { InvalidIdError, InvalidObjectError } from "../error.js"

import {
    findAllCustomersDB,
    findCustomerByIdDB,
    findCustomerByUserIdDB,
    saveCustomerDB,
    //updateProductDB,
    //deleteProductDB,
    //findProductByIdDB
} from "../repositories/customerRepository.js"

import { saveUserDB } from "../repositories/userRepository.js";
import { validateId } from "./idValidator.js";


export const getCustomers = async (request, response) => {

    try {

        let customers = await findAllCustomersDB();
        //Buscar todos los usuarios 
        //En bucle recorrer todos los customers y agregarle el usuario que corresponde
        response.status(200).json(customers);

    } catch (error) {

        response.status(500).json({ error: "Try later..." })

    }
}


export const getCustomerById = async (request, response) => {
    //Traer el cliente por Id.
    try {
        /*
        const customersDB = await db.query(
            "SELECT cu.customerId, cu.address, us.userId, us.name, us.surname, us.email, us.phone FROM Customer cu  JOIN User us ON cu.userId = us.userId LIMIT 0, 1000",
            { type: db.QueryTypes.SELECT }
        );
*/
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

export const postCustomers = async (request, response) => {

    try {

        const body = request.body;
        const userBody = request.body.user;

        User.validate(userBody);

        const user = new User(null, userBody.name, userBody.surname, userBody.email, userBody.phone, userBody.password, false);

        let userSaved = await saveUserDB(user);

        Customer.validate(body);

        const customer = new Customer(null, body.address, userSaved);

        let customerSaved = await saveCustomerDB(customer);

        response.status(200).json(customerSaved);

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

/*
export const putProducts = async (request, response) => {

    try {

        const productId = validateId(request.params.productId);

        const productDB = await findProductByIdDB(productId);

        if (productDB === null) {
            response.status(404).json({ error: "Can't find product.productId = " + productId })
        }
        // validar el producto que viene en el body del servicio
        // crear el objeto producto
        // mandarselo al updateProductDB como parametro
        // Verificar con en Postman y con la BD (delfin), que la actualización se esté haciendo correctamente.
        const body = request.body;

        Product.validate(body);

        const product = new Product(body.productId, body.productNumber, body.productName, body.productPrice, body.productPhoto);

        await updateProductDB(productId, product);

        response.status(200).json({ message: "Product(" + productId + ") updated successfully." });

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


export const deleteProducts = async (request, response) => {

    try {

        const productId = validateId(request.params.productId);

        const productDB = await findProductByIdDB(productId);

        if (productDB === null) {
            response.status(404).json({ error: "Can't find product.productId = " + productId })
        }

        await deleteProductDB(productId);

        response.status(200).json({ message: "Product(" + productId + ") deleted successfully." });

    } catch (error) {
        if (error instanceof InvalidIdError) {
            response.status(400).json({ error: error.message });
        } else {
            response.status(500).json({ error: error.message });
        }

    }
}
*/
