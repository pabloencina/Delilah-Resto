import { InvalidIdError } from "../error.js"
//import expressRateLimit from "express-rate-limit";
import { findUserByEmailAndPasswordDB } from "../repositories/userRepository.js"

/*const limiter = expressRateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: "Muchas peticiones por ahora espere un minuto"
});*/

//server.disable("x-powered-by");

//limiter
//console.log(limiter)
//expressRateLimit

export const postLogin = async (request, response) => {

    try {

        const email = request.body.email;
        const password = request.body.password;

        let userRecovered = await findUserByEmailAndPasswordDB(email, password)

        if (userRecovered === null) {
            response.status(404).json({ error: "Wrong email or password" });
        }

        response.status(200).json("Token: ...")

    } catch (error) {

        if (error instanceof InvalidIdError) {
            response.status(400).json({ error: error.message });

        } else {
            response.status(500).json({ error: error.message });
        }
    }

}