import express  from "express";
import { registeredUser, loginUser,logoutUser,userProfile,uploadPicture,
     getInfo,updateDetails,skillMatch,
     Info}  from "../controllers/authController.js";
import addMiddleware from "../middleware/isLoggin.js";
import validation from "../middleware/isValid.js";
    const router =express.Router();


router.get("/", function (req, res) {
    res.send("hey we are users don't ,just do the interest");
});

router.post("/register",registeredUser);
router.post("/login", loginUser);
router.post("/logout/:userId",logoutUser);
router.get("/auth/validate",validation);
router.get("/profile",addMiddleware,userProfile);

router.post("/uploadPicture",uploadPicture);
router.get("/getUserProfile/:userId",getInfo);
router.get("/getInfo/:userId",Info);

router.put("/update/:userId",updateDetails)
router.post("/skillMatch/",skillMatch)

export default router