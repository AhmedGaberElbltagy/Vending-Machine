const express = require("express");
const router = express();
require('dotenv').config()


router.use(express.json());

const{ProductsRoutes,usersRoutes} =require("./Router/router")
router.use(ProductsRoutes,usersRoutes);

const connection = require("./Database/connection");
connection();


const server =router.listen(process.env.PORT,()=>{
console.log(`server is running on port ${process.env.PORT}`)})

