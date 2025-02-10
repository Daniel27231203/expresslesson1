import { Router } from "express";
import authControllers from "./auth.controllers";
import { authMiddleware } from "./midleware";

const router = Router();
router.post("/register", authControllers.registerUser);
router.post("/login", authControllers.login);
router.get("/getProfile", authMiddleware, authControllers.getProfile);

export default router;
