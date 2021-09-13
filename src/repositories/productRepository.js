import { response } from 'express';
import { getProducts } from '../controllers/productController.js';
import db from '../db/index.js'

export const findAllProductsDB = async () => {
    /*
        conectar con la BD
        ejecutar un Select a la tabla productos
        crear los objetos entities
        devolverlos en un array
    */
    try {

        const productsDB = await db.query(
            "SELECT * FROM Product",
            { type: db.QueryTypes.SELECT }
        );
        console.log(productsDB);
        return productsDB;

    } catch (error) {

        console.error(error.message);
        throw error;

    }
}


export const findProductByIdDB = async (productId) => {

    try {

        const product = await db.query(
            "SELECT * FROM Product WHERE productId = ?",
            { type: db.QueryTypes.SELECT, replacements: [productId] }
        );

        if (product.length == 0) {
            return null;
        }

        return product;

    } catch (error) {

        console.error(error.message);
        throw error;

    }
}


export const saveProductDB = async (product) => {

    try {

        const productsDB = await db.query(
            "INSERT INTO Product (productId, productNumber, productName, productPrice, productPhoto) values(?,?,?,?,?)",
            {
                type: db.QueryTypes.INSERT,
                replacements: [product.productId, product.productNumber, product.productName, product.productPrice, product.productPhoto],
            }
        );
        return productsDB;

    } catch (error) {

        console.error(error.message);
        throw error;
    }
}


export const updateProductDB = async (productId, product) => {

    try {

        const result = await db.query(
            "UPDATE Product SET productNumber = ?, productName = ?, productPrice = ?, productPhoto = ? WHERE productId = ?",
            {
                type: db.QueryTypes.UPDATE,
                replacements: [product.productNumber, product.productName, product.productPrice, product.productPhoto, productId],
            }
        );
        console.log(result)
        return result;

    } catch (error) {

        console.error(error.message);
        throw error;
    }
}


export const deleteProductDB = async (productId) => {

    try {

        const result = await db.query(
            "DELETE FROM Product WHERE productId = ?",
            { type: db.QueryTypes.DELETE, replacements: [productId] }
        );

        return result;

    } catch (error) {

        console.error(error.message);
        throw error;
    }
}
