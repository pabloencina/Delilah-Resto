import { Customer } from "../entities/customer.js"
import { InvalidIdError, InvalidObjectError } from "../error.js"
import {
    findAllCustomersDB,
    saveProductDB,
    //updateProductDB,
    //deleteProductDB,
    //findProductByIdDB
} from "../repositories/customerRepository.js"

import { validateId } from "./idValidator.js";

export const getCustomers = async (request, response) => {
    
    try {

        let customers = await findAllCustomersDB();
        response.status(200).json(customers);

    } catch (error) {

        response.status(500).json({ error: "Intente despues..." })

    }
}
console.log(getCustomers)

export const postCustomers = async (request, response) => {
    
    try {
        //let products = await saveProductDB(request, response);
        const body = request.body;

        Customer.validate(body);

        const customer = new Customer(body.customerId, body.address, body.user, body.userId, body.name, body.surname, body.email, body.phone, body.password);

        let customers = await saveProductDB(customer);

        response.status(200).json(customers);

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
