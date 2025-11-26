import { Router } from "express";
import { verifyJWT,checkRole } from "../../../middlewares/index.js";

import * as controller from "../controller/index.js"


const router = Router();

router.post("/create",verifyJWT, controller.createDeliveryPerson);
router.post("/register", controller.registerDeliveryPerson);

router.route("/me")
.get(verifyJWT, controller.getDeliveryPerson)
.put(verifyJWT, controller.updateDeliveryPerson)
.delete(verifyJWT, controller.deleteDiliveryPerson)

router.get("/:id",verifyJWT,checkRole(["admin"]), controller.getDeliveryPersonById);


export default router;