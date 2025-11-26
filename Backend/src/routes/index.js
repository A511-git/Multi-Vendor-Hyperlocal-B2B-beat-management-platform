import { Router } from "express";
import userRoutes from "../modules/user/route/index.js";
import customerRoutes from "../modules/customer/route/index.js";
import vendorRoutes from "../modules/vendor/route/index.js";
import adminRoutes from "../modules/admin/route/index.js";
import diliveryPersonRoutes from "../modules/deliveryPerson/route/index.js";
import fieldManRoutes from "../modules/fieldMan/route/index.js";
import { verifyJWT, checkRole } from "../middlewares/index.js";

import {getDiliveryPersonsByQuery} from "../modules/deliveryPerson/controller/index.js"
import {getDiliveryPersonsByQuery} from "../modules/vendor/controller/index.js"


console.log("ROUTES LOADED FROM:", import.meta.url);



const router = Router();



router.use("/user", userRoutes);
router.use("/customer", customerRoutes);

router.use("/vendor", vendorRoutes);
router.get("/vendors",verifyJWT,checkRole(["customer"]), getVendorByQuery);

router.use("/admin", adminRoutes);

router.use("/delivery-person", diliveryPersonRoutes);
router.get("/delivery-persons",verifyJWT,checkRole(["vendor"]), getDiliveryPersonsByQuery);

router.use("/field-man", fieldManRoutes);


export default router;
