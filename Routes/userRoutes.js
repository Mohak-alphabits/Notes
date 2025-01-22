const express = require("express");

const { createuser,loginuser, logoutuser, updateuser, deleteuser } = require("../Controller/userController");

const router = express.Router();

router.post("/users", createuser);
router.post('/auth/login', loginuser);
router.post('/logout', logoutuser);
router.post('/update', updateuser);
router.post('/delete', deleteuser);

module.exports = router;
