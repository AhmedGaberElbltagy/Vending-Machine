const router = require("express").Router();

const {addProduct,GetProduct,GetProducts,updateProduct,deleteProduct,buy}=require("../controllers/products.controller")

const isAuth = require("../../../Middleware/Authentication");

router.get("/AllProducts",GetProducts)
router.get("/Product/:id",GetProduct)
router.post("/addProduct",isAuth(),addProduct)
router.post("/buy/:id",isAuth(),buy)
router.put("/updateProduct/:id",isAuth(),updateProduct)
router.delete("/deleteProduct/:id",isAuth(),deleteProduct)



module.exports = router;
