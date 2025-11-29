import { Router } from "express";
import { verifyJWT,checkRole,fetchSubject } from "../../../middlewares/index.js";

import * as controller from "../controller/index.js"


const router = Router();

router.post("/create",verifyJWT, controller.createAdmin);
router.post("/register", controller.registerAdmin);

router.route("/me", verifyJWT)
.get(fetchSubject,controller.getAdmin)

router.get("/:id",verifyJWT,checkRole(["admin"]), controller.getAdminById);


export default router;