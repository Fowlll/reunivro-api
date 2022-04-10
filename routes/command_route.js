const express = require("express");
const router = express.Router();

const controller = require("../controllers/command_controller");



// Get single user
router.get("/:id", controller.getSingle)

// Get all users
.get("/", controller.getAll)

// Create one user
.post("/", controller.createOne)

// Delete one user
.delete("/:id", controller.deleteOne);

module.exports = router;