import { Product } from "../entities/product.js"

import { InvalidIdError, InvalidObjectError, NotFoundError } from "../error.js"

import {

    findAllProductsDB,
    saveProductDB,
    updateProductDB,
    deleteProductDB,
    findProductByIdDB
    
} from "../repositories/productRepository.js"

import { validateId } from "./idValidator.js";

export const getProducts = async (request, response) => {
    // getProductsDB
    // cuando reciba los entities
    // debe crear los productDTO y devolverlos
    try {

        let products = await findAllProductsDB();
        response.status(200).json(products);

    } catch (error) {

        response.status(500).json({ error: "Intente despues..." })

    }
}


export const postProducts = async (request, response) => {
    // saveProductsDB
    // cuando reciba el request
    // debe crear un Product y guardarlo
    try {
        //let products = await saveProductDB(request, response);
        const body = request.body;

        Product.validate(body);

        const product = new Product(body.productId, body.productNumber, body.productName, body.productPrice, body.productPhoto);

        let productSaved = await saveProductDB(product);

        response.status(201).json(productSaved);

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


export const putProducts = async (request, response) => {

    try {

        const productId = validateId(request.params.productId);

        const productDB = await findProductByIdDB(productId);

        if (productDB === null) {
            response.status(404).json({ error: "Can't find product.productId = " + productId });
        }
        // validar el producto que viene en el body del servicio
        // crear el objeto producto
        // mandarselo al updateProductDB como parametro
        // Verificar con en Postman y con la BD (delfin), que la actualización se esté haciendo correctamente.
        const body = request.body;

        Product.validate(body);

        const product = new Product(body.productId, body.productNumber, body.productName, body.productPrice, body.productPhoto);

        await updateProductDB(productId, product);

        response.status(201).json({ message: "Product(" + productId + ") updated successfully." });

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
            throw new NotFoundError("Can't find product.productId = " + productId);
        }

        await deleteProductDB(productId);

        response.status(200).json({ message: "Product(" + productId + ") deleted successfully." });

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


