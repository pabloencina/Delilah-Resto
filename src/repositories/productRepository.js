
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
            throw new Error("Can't find product.productId = " + productId);
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
        console.log(productsDB);
        return productsDB;

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
