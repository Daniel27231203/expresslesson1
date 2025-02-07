import { Router } from "express";
import cors from "cors";
import todoRoutes from "../modules/todo/todo.routes";
import AuthRoutes from "../modules/auth/auth.routes";
const corsConfig = {
  origin: [
    "http://localhost:5000",
    "https://localhost:3000",
    "https://expresslesson1.onrender.com",
  ],
};

const router = Router();

router.use("/todo", cors(corsConfig), todoRoutes);
router.use("/auth", cors(corsConfig), AuthRoutes);

export default router;
