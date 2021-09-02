import { request, response } from "express";
import { Product } from "../entities/product.js"

import { 
    getProductsDB, 
    saveProductDB
} from "../repositories/productRepository.js"


export const getProducts = async (request, response) => {
    // getProductsDB
    // cuando reciba los entities
    // debe crear los productDTO y devolverlos
    try {

        let products = await getProductsDB();
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

        response.status(500).json({ error : error.message })

    }
}
