import { Router } from "express";
import { verifyJWT,checkRole } from "../../../middlewares/index.js";

import * as controller from "../controller/index.js"


const router = Router();

router.post("/create",verifyJWT, controller.createFieldMan);
router.post("/register", controller.registerFieldMan);

router.route("/me")
.get(verifyJWT, controller.getFieldMan)
.put(verifyJWT, controller.updateFieldMan)
.delete(verifyJWT, controller.deleteFieldMan)

router.get("/:id",verifyJWT,checkRole(["admin"]), controller.getFieldManById);


export default router;