import { Router } from "express";
import { verifyJWT,checkRole } from "../../../middlewares/index.js";

import * as controller from "../controller/index.js"


const router = Router();

router.post("/create",verifyJWT, controller.createVendor);
router.post("/register", controller.registerVendor);

router.route("/me")
.get(verifyJWT,verifyJWT, controller.getVendor)
.put(verifyJWT,verifyJWT, controller.updateVendor)
.delete(verifyJWT,verifyJWT, controller.deleteVendor)

router.get("/:id", controller.getVendorById);


export default router;