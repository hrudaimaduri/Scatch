const express = require("express");
const router = express.Router();
const ProductModel = require("../models/ProductModel");
const upload = require("../designs/multerConfig");

router.get("/admin", function (req, res) {
    res.render("createproducts", { success: "" });
});

router.post("/admin", upload.single("image"), async function (req, res) {
    try {
        let { name, price, bgcolor, panelcolor, textcolor } = req.body;

        await ProductModel.create({
            name,
            price,
            bgcolor,
            panelcolor,
            textcolor,
            image: req.file ? req.file.buffer : null
        });

        req.flash("success", "Product Created Successfully!");
        res.redirect("/owner/admin");
    } catch (err) {
        res.send(err.message);
    }
});

router.get("/all", async function (req, res) {
    let products = await ProductModel.find();
    res.render("shop", { products });
});

module.exports = router;
