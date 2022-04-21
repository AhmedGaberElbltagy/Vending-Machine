const app = require("express").Router();

const {addProduct,AllProducts,updateProduct,deleteProduct, buy}=require("../controllers/products.controller")

const isAuth = require("../../../Middleware/Authentication");

app.get("/AllProducts",AllProducts)
app.post("/addProduct",isAuth(),addProduct)
app.post("/buy/:id",isAuth(),buy)
app.put("/updateProduct/:id",isAuth(),updateProduct)
app.delete("/deleteProduct/:id",isAuth(),deleteProduct)



module.exports = app;
