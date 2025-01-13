const express = require("express");
const { createUser,loginuser, logoutUser } = require("../Controller/userController");

const router = express.Router();

router.post("/users", createUser);
router.post('/auth/login', loginuser);
router.post('/logout', logoutUser);

module.exports = router;
