import { Router } from "express";
import authControllers from "./auth.controllers";
import { adminMiddleware, authMiddleware } from "./midleware";

const router = Router();
router.post("/register", authControllers.registerUser);
router.post("/login", authControllers.login);
router.get("/getProfile", authMiddleware, authControllers.getProfile);
router.get(
  "/getAllProfile",
  authMiddleware,
  adminMiddleware,
  authControllers.getAllProfile
);
router.delete(
  "/deleteAccount/:id",
  authMiddleware,
  adminMiddleware,
  authControllers.deleteAccount
);

export default router;
