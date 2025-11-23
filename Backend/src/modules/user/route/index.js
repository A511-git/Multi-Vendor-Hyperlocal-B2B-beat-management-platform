import { Router } from "express";
import { verifyJWT } from "../../../middlewares/index.js";

import * as controller from "../controller/index.js"


console.log("USER ROUTER LOADED FROM:", import.meta.url);

const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.post("/refresh-token", verifyJWT, controller.refreshToken);
router.post("/logout",verifyJWT, controller.logout);

router.route("/me")
.get(verifyJWT, controller.getUser)
.put(verifyJWT, controller.updateUser)
.delete(verifyJWT, controller.deleteUser)

router.get("/:id", controller.getUserById);


export default router;