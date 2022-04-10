const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
// require('dotenv').config();
const config = require("./config.json");

mongoose.connect("mongodb+srv://reunivro:reunivro@cluster0.dzlpl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority").then(
    (err, db) =>{
        if(err) console.log(err);
        console.log("Connected to database");
    }
).catch((e) =>{
    console.log("Can't connect to database");
    console.log(e);
});

// const user = require("./models/userModel");

// (async () =>{
//     let u = new user({
//         firstname: "Dawson",
//         lastname: "Prianon",
//         email: "dawson.prianon@gmail.com",
//         password: "wepwep"
//     });
    
//     await u.save().then(() =>{
//         console.log("User created");
//     });
// })();

const userRoutes = require("./routes/user_route.js");
const commandRoutes = require("./routes/command_route.js");
const authRoutes = require("./routes/auth_route.js");


app.use(bodyParser.urlencoded({extended: true}))
.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

.use(cors())

.use("/user/", userRoutes)
.use("/command/", commandRoutes)
.use("/auth/", authRoutes);



app.listen(process.env.REUNIVRO_API_PORT);

console.log("Server is listening on port " + process.env.REUNIVRO_API_PORT);