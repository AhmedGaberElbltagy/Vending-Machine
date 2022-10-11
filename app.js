const express = require("express");
const app = express();
require('dotenv').config()
const Port = process.env.PORT

app.use(express.json());

const{ProductsRoutes,usersRoutes} = require("./Router/router")
app.use(ProductsRoutes,usersRoutes);

const connection = require("./Database/connection")();



app.listen(process.env.PORT,() => {
console.log(`server is running on port ${Port}`)})

