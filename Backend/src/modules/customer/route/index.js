import { Router } from "express";
import { verifyJWT,checkRole } from "../../../middlewares/index.js";

import * as controller from "../controller/index.js"


const router = Router();

router.post("/create",verifyJWT, controller.createCustomer);
router.post("/register", controller.registerCustomer);

router.route("/me")
.get(verifyJWT, controller.getCustomer)
.put(verifyJWT, controller.updateCustomer)
.delete(verifyJWT, controller.deleteCustomer)

router.get("/:id",verifyJWT,checkRole(["admin"]), controller.getCustomerById);


export default router;