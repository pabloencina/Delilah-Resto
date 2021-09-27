import db from '../db/index.js';


export const findAllUsersDB = async () => {
    
    try {

        const usersDB = await db.query(
            "SELECT * FROM User",
            { type: db.QueryTypes.SELECT }
        );
        console.log(usersDB);
        return usersDB;

    } catch (error) {

        console.error(error.message);
        throw error;

    }
}


export const findUserByIdDB = async (userId) => {

    try {

        const user = await db.query(
            "SELECT * FROM User WHERE userId = ?",
            { type: db.QueryTypes.SELECT, replacements: [userId] }
        );

        if (user.length == 0) {
            return null;
        }

        return user ;

    } catch (error) {

        console.error(error.message);
        throw error;

    }
}


export const saveUserDB = async (user) => {

    try {

        const responseDB = await db.query(
            "INSERT INTO User (userId, name, surname, email, phone, password) values(?,?,?,?,?,?)",
            {
                type: db.QueryTypes.INSERT,
                replacements: [null, user.name, user.surname, user.email, user.phone, user.password],
            }
        );
        user.userId = responseDB[0];
        return user;

    } catch (error) {

        console.error(error.message);
        throw error;
    }
}
