const user = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.getAll = (req, res) =>{

    user.find({}, (error, docs) =>{
        if(error) console.log(error);

        if(docs.length == 0){
            res.json({error: "There is no users"});
        }

        res.json(docs);
    });


}

module.exports.getSingle = (req, res) =>{

    user.findOne({_id: req.params.id}, (error, doc) =>{

        if(error) console.log(error);

        if(!doc){
            res.json({error: "No user was found with this id"});
        }

        res.json(doc);

    })

}

module.exports.createOne = async (req, res) =>{

    

    let userExist = await user.findOne({email: req.body.email});

    if(userExist){
        res.json({error: "register/userAlreadyExists"});
        return;
    }

    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(req.body.password, 10, function(err, hash) {
          if (err) reject(err)
          resolve(hash)
        });
      })

    let u = new user({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword,
    });

    await u.save();
    
    return res.status(200).json({success: "register/ok"});

}

module.exports.deleteOne = (req, res) =>{

    res.json({name: "Delete one user: " + req.params.id});

}