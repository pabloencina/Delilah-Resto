import { request, response } from "express";
import { Product } from "../entities/product.js"

import { 
    findAllProductsDB, 
    saveProductDB,
    deleteProductDB,
    findProductByIdDB
} from "../repositories/productRepository.js"


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
        
        let products = await saveProductDB(product);

        response.status(200).json(products);

    } catch (error) {

        response.status(500).json({ error : error.message });

    }
}

export const deleteProducts = async (request, response) => {

    try {

        const productId = validateId(request.params.productId);

        await findProductByIdDB(productId);

        await deleteProductDB(productId);

        response.status(200).json({message: "Product("+ productId + ") deleted successfully."});

    } catch (error) {

        response.status(500).json({ error: error.message })

    }
}

const validateId = (id) => {
    
    if (id === null || id === undefined) {
        throw new Error("Id can't be null or undefined.");
    } 
    let idNum = parseInt(id);
    if (idNum <= 0) {
        throw new Error("Id can't be 0 or minor.");
    }
    return idNum;

}