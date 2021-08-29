import ProductDTO from "./dto/productDTO.js"
//import { product } from "../entities/product"
/*
import { 
    getProductsDB, 
    saveProductDB
} from "../repositories/productRepository.js"
*/
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

    let products = []
    let product1 = new ProductDTO(1,10,"Papas fritas",290.00, "null");
    let product2 = new ProductDTO(2,15,"Hamburguesa",580.00, "null");
    
    products.push(product1)
    products.push(product2)
    
    response.status(200);
    response.json(products);
}

