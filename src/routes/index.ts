import { Router } from "express";
import cors from "cors";
import todoRoutes from "../modules/todo/todo.routes";
const corsConfig = {
  origin: [
    "https://elcho.dev/",
    "http://localhost:5000",
    "https://localhost:3000",
  ],
};

const router = Router();

router.use("/todo", cors(corsConfig), todoRoutes);

export default router;
