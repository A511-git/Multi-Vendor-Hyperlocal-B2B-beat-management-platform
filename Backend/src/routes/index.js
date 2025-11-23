import { Router } from "express";
import userRoutes from "../modules/user/route/index.js";
import { verifyJWT, checkRole } from "../middlewares/index.js";
import * as controller from "../modules/index.controller.js"


console.log("ROUTES LOADED FROM:", import.meta.url);



const router = Router();



router.use("/user", userRoutes);
router.get("/users", verifyJWT, checkRole(["admin"]), controller.getUsers)

export default router;
