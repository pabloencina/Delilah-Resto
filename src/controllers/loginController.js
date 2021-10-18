//import { response } from "express";
//import rateLimit from "express-rate-limit";
import { InvalidIdError } from "../error.js"
import jsonwebtoken from "jsonwebtoken";
//import expressRateLimit from "express-rate-limit";
import { findUserByEmailAndPasswordDB } from "../repositories/userRepository.js"
import { findAdministratorByUserIdDB } from "../repositories/administratorRepository.js";
/*const limiter = expressRateLimit({
    windowMs: 60 * 1000,
    max: 5,
    message: "Muchas peticiones por ahora espere un minuto"
});*/

//server.disable("x-powered-by");

//limiter
//console.log(limiter)
//expressRateLimit


/*const rateLimitPolicy = rateLimit({

    message: "Try later please",
    max: 10,
    windowMs: 60 * 1000

})*/

export const postLogin = async (request, response) => {

    try {

        const email = request.body.email;
        const password = request.body.password;

        let userRecovered = await findUserByEmailAndPasswordDB(email, password)

        if (userRecovered === null) {
            response.status(404).json({ error: "Wrong email or password" });
        }
        console.log(userRecovered)
        let administratorRecovered = await findAdministratorByUserIdDB(userRecovered.userId);
//console.log(administratorRecovered)
        if (administratorRecovered === null) {
            userRecovered.admin = false
        } else {
            userRecovered.admin = true
        }
//console.log(userRecovered)
        const secretJWT = "ponerAlgoSuperComplicadoConNumuerosYCaracteres1234"
        /*
                expressJwt({
                    secret: secretJWT,
                    algorithms: ["HS256"],
                }).unless({
                    path: ["/logIn"]
                })
        */
        const token = jsonwebtoken.sign(
            userRecovered,
            secretJWT,
            {
                expiresIn: "10m"
            }
        );

        console.log(token);

        response.status(200).json(token);

    } catch (error) {

        if (error instanceof InvalidIdError) {
            response.status(400).json({ error: error.message });

        } else {
            response.status(500).json({ error: error.message });
        }
    }

}



//1- Proteger todos los endpoints menos el de login usando express-jwt como middleware global
//No hay que exponer esta cadena, NUNCA
/*
const secretJWT = "ponerAlgoSuperComplicadoConNumuerosYCaracteres1234"

server.use(

    expressJwt({
        secret: secretJWT,
        algorithms: ["HS256"],
    }).unless({
        path: ["/login"]
    })

);


function validarAdmin(request, response, next) {
    console.log("request.user");
    console.log(request.user);
    if (!request.user.admin) {
        response.status(401).json({
            error: "The user is NOT an ADMINISTRATOR",
        });
    } else {
        next();
    }

}//2. escribir el endpoint de login
app.post("/login", (request, response) => {
    const usernamePost = request.body.username;
    const passwordPost = request.body.password;
    const usuarioValidado = users.find(
        (user) => user.username == usernamePost && user.password == passwordPost
    );

    if (!usuarioValidado) {
        response.status(401).json({
            error: "usuario o contrasena invalida",
        });
    } else {
        //3. crear el token
        const token = jwt.sign(
            {
                username: usuarioValidado.username,
                rol: usuarioValidado.rol,
                email: usuarioValidado.email,
                algomas: "algomas",
                admin: usuarioValidado.admin,
            },
            secretJWT,
            { expiresIn: "60m" }
        );
        response.status(200).json({ token });
    }
});


//4. escribir endpoints el resto
server.get("/seguro", validarAdmin, (request, response) => {
    response.json({
        data: "data muy segura a nombre de " + request.user.email,
    });
});
server.listen(3000, () => {
    console.log("servidor iniciado");
});
*/