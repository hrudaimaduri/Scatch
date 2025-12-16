const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

module.exports = async function (req, res, next) {
    try {
        if (!req.cookies.token) {
            req.flash("error", "Session expired, please login again.");
            return res.redirect("/");
        }
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);

        let user = await UserModel.findOne({ email: decoded.email }).select("-password");

        if (!user) {
            req.flash("error", "Session expired, please login again.");
            return res.redirect("/");
        }
        req.user = user;  
        next();  
    } catch (err) {
        req.flash("error", "Session expired, please login again.");
        return res.redirect("/");
    }
};
