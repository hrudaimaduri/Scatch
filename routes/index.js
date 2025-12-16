const express = require("express");
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedin");
const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/UserModel");

router.get("/", function(req, res) {
    let error = req.flash("error");
    res.render("index", { error });
});

router.get("/shop", isLoggedin, async function(req, res) {
    let products = await ProductModel.find();
    let success = req.flash("success");
    res.render("shop", { products, success });
});

router.get("/addtocart/:id", isLoggedin, async function(req, res) {
    let user = await UserModel.findOne({ email: req.user.email });
    user.cart.push(req.params.id); // ✅ FIXED
    await user.save();
    req.flash("success", "Added to cart");
    res.redirect("/shop");
});

router.get("/cart", isLoggedin, async function(req, res) {
    let user = await UserModel
        .findOne({ email: req.user.email })
        .populate("cart");

    let bill = 0;
    if (user.cart.length > 0) {
        bill = Number(user.cart[0].price) + 20 - Number(user.cart[0].discount || 0);
    }

    res.render("cart", { user, bill });
});

router.get("/logout", isLoggedin, function(req, res) {
    res.cookie("token", "");
    req.flash("success", "Logged out successfully");
    res.redirect("/");
});

module.exports = router;
