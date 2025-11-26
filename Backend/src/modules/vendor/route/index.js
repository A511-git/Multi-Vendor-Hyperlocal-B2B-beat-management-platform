import { Router } from "express";
import { verifyJWT,checkRole } from "../../../middlewares/index.js";

import * as controller from "../controller/index.js"


const router = Router();

router.post("/create",verifyJWT, controller.createVendor);
router.post("/register", controller.registerVendor);

router.route("/me")
.get(verifyJWT, controller.getVendor)
.put(verifyJWT, controller.updateVendor)
.delete(verifyJWT, controller.deleteVendor)

router.get("/:id",verifyJWT,checkRole(["admin"]), controller.getVendorById);


export default router;