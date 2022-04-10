const jwt = require("jsonwebtoken");
require("dotenv").config();

// const JWT_SECRET = ${process.env.JWT_TOKEN};

module.exports = async (req, res, next) =>{

    let token = req.headers['x-access-token'] || req.headers['authorization'];

    console.log("############### authCheck recv token ####################");
    console.log(token);

    if (!!token && token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    if(!token){
        return res.status(401).json("access/tokenRequired");
    }

    

    


    jwt.verify(token, "secret1234", (err, decoded) =>{

        if(err){
            return res.status(400).json({error: "access/tokenNotValid"});
        } 

        req.decoded = decoded;

        const expiresIn = 24 * 60 * 60;
        const newToken = jwt.sign({
            user: decoded.user
        },
        "secret1234",
        {
            expiresIn: expiresIn
        });

        console.log("OKOKOKOK pour le middleware");

        res.header('Authorization', 'Bearer ' + newToken);

        next();

    })

}