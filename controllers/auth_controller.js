const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");


const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (req, res) =>{

    const { email, password } = req.body;

    let user = await userModel.findOne({email: email});

    if(!user){
        res.json({error: "auth/userNotFound"});
    }

    bcrypt.compare(password, user.password, (err, response) =>{
        if(err) throw new Error(err);

        if(!response){
            res.json({error: "auth/wrongCredentials"});
            return;
        }

        const expiresIn = 24*60 *60;
        const token = jwt.sign({user: user}, "secret1234", { expiresIn: expiresIn});

        console.log("############### authCheck sended token ####################");
        console.log(token);

        res.json({token: token, user: user});



    })

}

module.exports.auth = auth;