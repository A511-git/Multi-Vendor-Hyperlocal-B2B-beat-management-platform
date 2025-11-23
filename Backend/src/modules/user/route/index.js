import { Router } from "express";
import { verifyJWT } from "../../../middlewares/index.js";
import { login, register, refreshToken, logout } from "../controller/auth.controller.js";
import { getUser, updateUser, deleteUser } from "../controller/profile.controller.js"


console.log("USER ROUTER LOADED FROM:", import.meta.url);

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh-token", verifyJWT, refreshToken);
router.post("/logout",verifyJWT, logout);

router.route("/me")
.get(verifyJWT, getUser)
.put(verifyJWT, updateUser)
.delete(verifyJWT, deleteUser)



export default router;