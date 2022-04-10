const express = require("express");
const router = express.Router();

const controller = require("./../controllers/user_controller");
const authCheck = require("../middleware/authCheck");


// Get single user


router.get("/:id", authCheck, controller.getSingle)

// Get all users
.get("/", authCheck, controller.getAll)

// Create one user
.post("/", controller.createOne)

// Delete one user
.delete("/:id", authCheck, controller.deleteOne);

module.exports = router;