import db from '../db/index.js';

export const findAllAdministratorsDB = async () => {
    
    try {

        const administratorsDB = await db.query(
            "SELECT ad.administratorId, ad.identificationNumber, us.userId, us.name, us.surname, us.email, us.phone FROM Administrator ad JOIN User us ON ad.userId = us.userId LIMIT 0, 1000",
            { type: db.QueryTypes.SELECT }
        );
        console.log(administratorsDB);
        return administratorsDB;

    } catch (error) {

        console.error(error.message);
        throw error;

    }
}


export const findAdministratorByIdDB = async (administratorId) => {

    try {

        const administrator = await db.query(
            "SELECT * FROM Administrator WHERE administratorId = ?",
            { type: db.QueryTypes.SELECT, replacements: [administratorId] }
        );

        if (administrator.length == 0) {
            return null;
        }

        return administrator ;

    } catch (error) {

        console.error(error.message);
        throw error;

    }
}

export const findAdministratorByUserIdDB = async (userId) => {

    try {

        const administrator = await db.query(
            "SELECT * FROM Administrator WHERE userId = ?",
            { type: db.QueryTypes.SELECT, replacements: [userId] }
        );

        if (administrator.length == 0) {
            return null;
        }

        return administrator[0] ;

    } catch (error) {

        console.error(error.message);
        throw error;

    }

}

export const saveAdministratorDB = async (administrator) => {

    try {

        const responseDB = await db.query(
            "INSERT INTO Administrator (administratorId, identificationNumber, userId) values(?,?,?)",
            {
                type: db.QueryTypes.INSERT,
                replacements: [null, administrator.identificationNumber, administrator.user.userId],
            }
        );
        administrator.administratorId = responseDB[0];
        return administrator;

    } catch (error) {

        console.error(error.message);
        throw error;
    }
    
}
