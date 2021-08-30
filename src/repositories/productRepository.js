
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

export const saveProductDB = async (product) => {
    /*
        conectar con la BD
        ejecutar un Select a la tabla productos
        crear los objetos entities
        devolverlos en un array
    */
}