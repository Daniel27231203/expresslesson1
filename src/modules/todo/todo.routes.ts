import { Router } from "express";
import todoControllers from "./todo.controllers";
import { authMiddleware } from "../auth/midleware";

const router = Router();

router.get("/getAll", authMiddleware, todoControllers.getAllTodo);
router.put("/update/:id", authMiddleware, todoControllers.updateTodo);
router.post("/create", authMiddleware, todoControllers.createTodo);
router.delete("/delete/:id", authMiddleware, todoControllers.deleteOnTodo);
router.get("/getById/:id", authMiddleware, todoControllers.getOne);
// router.get("/search/:value", todoControllers.getOne);
router.delete("/deleteAll", authMiddleware, todoControllers.deleteAll);

export default router;
