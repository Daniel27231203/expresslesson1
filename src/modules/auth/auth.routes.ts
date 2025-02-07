import { Router } from "express";
import authControlers from "./auth.controllers";

const router = Router();
router.post("/register", authControlers.registerUser);
// router.post("/login", authControlers.login);

export default router;
