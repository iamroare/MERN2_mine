import { Router } from "express";
const router= Router();

// import all controllers in apiControllers
import * as controller from "../controllers/apiControllers.js";
import Auth from "../middleware/auth.js";
import { localVariable } from "../middleware/auth.js";
import { registerMail } from "../controllers/mailer.js";
/** POST METHODS */

router.route('/register').post(controller.register);

router.route("/registerMail").post(registerMail);
router.route("/authenticate").post( controller.verifyuser ,(req,res)=> res.end());
router.route("/login").post( controller.verifyuser, controller.login);


// GET METHODS
router.route("/user/:username").get(controller.getUser);
router.route("/generateOTP").get(controller.verifyuser,localVariable, controller.generateOTP);
router.route("/verifyOTP").get(controller.verifyuser ,controller.verifyOTP);
router.route("/createResetSession").get(controller.createResetSession);




// PUT METHODS

router.route("/updateuser").put(Auth,controller.updateUser);
router.route("/resetPassword").put(controller.verifyuser ,controller.resetPassword);




export default router;