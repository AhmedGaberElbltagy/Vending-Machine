const express = require("express");
const app = express();


const connection = require("./Database/connection");
connection();
app.use(express.json());
app.use(require("./modules/products/routes/products.route"));
app.use(require("./modules/users/routes/users.route"));




app.listen(3000,()=>{
console.log("server is running on port 3000")
})

