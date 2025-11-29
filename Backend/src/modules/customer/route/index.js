import { Router } from "express";
import { verifyJWT,checkRole, fetchSubject } from "../../../middlewares/index.js";

import * as controller from "../controller/index.js"


const router = Router();

router.post("/create",verifyJWT, controller.createCustomer);
router.post("/register", controller.registerCustomer);

router.route("/me",verifyJWT)
.get( controller.getCustomer)
.put( controller.updateCustomer)
.delete(fetchSubject, controller.deleteCustomer)

router.get("/:id",verifyJWT,checkRole(["admin"]), controller.getCustomerById);


export default router;