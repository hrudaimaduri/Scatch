const express = require("express");
const router = express.Router();
const ProductModel = require("../models/ProductModel");
const upload = require("../designs/multerConfig");

router.get("/admin", function (req, res) {
    let success = req.flash("success");
    res.render("createproducts", { success });
});

router.post("/admin/create", upload.single("image"), async function (req, res) {
    try {
        let { name, price, bgcolor, panelcolor, textcolor } = req.body;

        await ProductModel.create({
            name,
            price,
            bgcolor,
            panelcolor,
            textcolor,
            image: req.file.buffer
        });

        req.flash("success", "Product created successfully!");
        res.redirect("/owner/admin");
    } catch (err) {
        res.send(err.message);
    }
});

module.exports = router;
