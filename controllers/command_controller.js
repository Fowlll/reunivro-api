const command = require("../models/commandModel");

module.exports.getAll = (req, res) =>{

    command.find({}, (error, docs) =>{
        if(error) console.log(error);

        if(docs.length == 0){
            res.json({error: "There is no commands"});
        }

        res.json(docs);
    });

}

module.exports.getSingle = (req, res) =>{

    command.findOne({email: req.params.id}, (error, doc) =>{

        if(error) console.log(error);

        if(!doc){
            res.json({error: "No command was found with this id"});
        }

        res.json(doc);

    })

}

module.exports.createOne = async (req, res) =>{

    let c = new command({
        email: req.body.email,
        cart: req.body.cart,
    });

    await c.save();

    return res.status(200).json({success: "command/created"});

}

module.exports.deleteOne = (req, res) =>{

    res.json({name: "Delete one command: " + req.params.id});

}