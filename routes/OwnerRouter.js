const express = require("express");
const router = express.Router();
const ownerModel = require("../models/OwnerModel");
const OwnerModel = require("../models/OwnerModel");

if(process.env.NODE_ENV === "development"){
    router.post("/create", async function(req,res){
        let owners = await ownerModel.find();
        if(owners.length>0){
            return res
            .status(502)
            .send("You Dont Have Permission Bro");
            }
        
        let {fullname,email,password} = req.body
        let CreatedOwner = await OwnerModel.create({
            fullname,
            email,
            password,
        });
        res.status(201).send(CreatedOwner);
    });
}

router.get("/",function(req,res){
    res.send("Hi");
})

module.exports = router;