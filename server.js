//module.exports = product
//1- Importar express y demas librerias.
/*
const express = require("express");
const path = require('path');
const exphbs = require('express-handlebars');
const { extname } = require("path");
*/
import compression from "compression";
import express from "express";
import helmet from "helmet";
import jsonwebtoken from "jsonwebtoken";
import expressRateLimit from "express-rate-limit";
import expressJwt from "express-jwt";

import productRoutes from "./src/routes/productRoutes.js";
import customerRoutes from "./src/routes/customerRoutes.js";
// const otraLibreria = require("otraLibreria")

//2- Crear la instancia de Express.
const server = express();

// 3.1- Definir constantes.
const PORT = 3000;

//module.exports = require('./lib/sequelize');
//server.set('port', process.env.PORT || 3000)
server.set('port', PORT);
//localhost -> 127.0.0.1:3000

//3- Agregar Middleware(vigilantes ante de llegar a la ruta es es middleware) globales.
server.use(express.json());// este middleware nos convierte el json del body en objeto.
server.use(compression())
server.use(helmet())
//server.use(jsonwebtoken())
//server.use(sequelize())

// server.set('ProductController.js', path.join(__dirname,'ProductController.js'));
server.use(productRoutes);
server.use(customerRoutes)
server.listen(server.get("port"))
console.log(`se ha iniciado el servidor en el puerto ${PORT}`);
