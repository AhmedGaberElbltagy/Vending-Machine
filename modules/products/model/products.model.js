const mongoose = require("mongoose");

const productSchema = require("../Schema/products.Schema")

const product = mongoose.model("products",productSchema);
module.exports =product;
