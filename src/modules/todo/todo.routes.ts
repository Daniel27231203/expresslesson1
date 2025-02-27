import { Router } from "express";
import todoControllers from "./todo.controllers";
import { adminMiddleware, authMiddleware } from "../auth/midleware";

const router = Router();

router.get("/getAll", todoControllers.getAllProducts);
router.get("/getById/:id", todoControllers.getOne);
router.post("/create", authMiddleware, todoControllers.createProducts);
router.put("/update/:id", authMiddleware, todoControllers.updateProducts);
router.delete("/delete/:id", authMiddleware, todoControllers.deleteOnproducts);
router.delete(
  "/deleteAllMy",
  authMiddleware,
  todoControllers.deleteAllUserProducts
);
router.delete(
  "/deleteAll",
  authMiddleware,
  adminMiddleware,
  todoControllers.deleteAll
);
router.get("/getByCategory/:category", todoControllers.getProductsByCategory);
// router.get("/get-product/:id", authMiddleware, todoControllers."");
// router.get("/search/:value", todoControllers.getOne);

export default router;
