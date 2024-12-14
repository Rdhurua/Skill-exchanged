const express = require("express");
const userModel = require("../model/user-model");
const router = express.Router();
const { registeredUser, loginUser, logoutUser,userProfile,uploadPicture,getInfo } = require("../controllers/authController");
const addMiddleware=require("../middleware/isLoggin");
const validation=require("../middleware/isValid");


router.get("/", function (req, res) {
    res.send("hey we are users don't ,just do the interest");
});

router.post("/register", registeredUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/auth/validate",validation);
router.get("/profile",addMiddleware,userProfile);

router.post("/uploadPicture",uploadPicture);
router.get("/getUserProfile/:userId",getInfo);

module.exports = router