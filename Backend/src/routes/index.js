

import { Router } from "express";

import userRoutes from "../modules/user/route/index.js";


console.log("ROUTES LOADED FROM:", import.meta.url);



const router = Router();



router.use("/user", userRoutes);

export default router;
