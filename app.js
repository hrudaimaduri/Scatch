const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const db = require("./config/MongooseConncetion");
const OwnerRouter = require("./routes/OwnerRouter");
const ProductRouter = require("./routes/ProductRouter");
const UserRouter = require("./routes/UserRouter");



app.set("view engine" , "ejs")
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser());

app.get("/",function(req,res){
    res.send("hey");

})
app.use("/owner",OwnerRouter);
app.use("/user",UserRouter);
app.use("/product",ProductRouter);




app.listen(3030);