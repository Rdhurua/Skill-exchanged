const express = require("express");
const userModel = require("../model/user-model");
const router = express.Router();
const { registeredUser, loginUser, logoutUser } = require("../controllers/authController")
router.get("/", function (req, res) {
    res.send("hey we are users don't ,just do the interest");
});

router.post("/register", registeredUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);


module.exports = router