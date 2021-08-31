import ProductDTO from "./dto/productDTO.js"


import { Product } from "../entities/product"

import { 
    getProductsDB, 
    saveProductDB
} from "../repositories/productRepository.js"
/*
const PRODUCT = [
    {
        id: 1,
        nombre: "Milanesa",
        precio: "520"
    },
    {
        id: 2,
        nombre: "Pablo",
        precio: "Argentina"
    },
    {
        id: 3,
        nombre: "Andre",
        pais: "Colombia"
    },
];
*/
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

        let products = await saveProductDB(request, response);


        response.status(200).json(products);

    } catch (error) {

        response.status(500).json({ error: "Intente más tarde..." })

    }
}
