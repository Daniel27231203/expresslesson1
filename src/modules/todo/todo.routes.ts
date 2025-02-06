import { Router } from "express";
import todoControllers from "./todo.controllers";

const router = Router();

router.get("/getAll", todoControllers.getAllTodo);
router.put("/update/:id", todoControllers.updateTodo);
router.post("/create", todoControllers.createTodo);
router.delete("/delete/:id", todoControllers.deleteOnTodo);
router.get("/getById/:id", todoControllers.getOne);
router.get("/search/:value", todoControllers.getOne);
router.delete("/deleteAll", todoControllers.deleteAll);

export default router;
