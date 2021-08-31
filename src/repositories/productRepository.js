
import db from '../db/index.js'

export const getProductsDB = async () => {
    /*
        conectar con la BD
        ejecutar un Select a la tabla productos
        crear los objetos entities
        devolverlos en un array
    */
    try {

        const productsDB = await db.query(
            'SELECT * FROM Product',
            { type: db.QueryTypes.SELECT }
        );
        console.log(productsDB);
        return productsDB;

    } catch (error) {

        console.error(error.message);
        throw error;

    }
}

export const saveProductDB = async (request, response) => {
    /*
        conectar con la BD
        ejecutar un Select a la tabla productos
        crear los objetos entities
        devolverlos en un array
    */
   console.log(request.body)
    try {

        const productsDB = await db.query(
            "INSERT INTO Product (productId, productNumber, productName, productPrice, productPhoto) values(?,?,?,?,?)",
            {
                type: db.QueryTypes.INSERT,
                replacements: [request.body.productId, request.body.productNumber, request.body.productName, request.body.productPrice, request.body.productPhoto],
            }
        );
        console.log(productsDB);
        return productsDB;

    } catch (error) {

        console.error(error.message);
        throw error;

    }
}