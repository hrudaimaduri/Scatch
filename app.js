const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const db = require("./config/MongooseConnection");
const OwnerRouter = require("./routes/OwnerRouter");
const ProductRouter = require("./routes/ProductRouter");
const UserRouter = require("./routes/UserRouter");
const indexRouter = require("./routes/index")
require("dotenv").config();
const expressSession =  require("express-session");
const flash = require("connect-flash");

app.set("view engine" , "ejs")
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
)
app.use(flash());

app.use("/",indexRouter)
app.use("/owner",OwnerRouter);
app.use("/user",UserRouter);
app.use("/product",ProductRouter);

app.listen(3030);