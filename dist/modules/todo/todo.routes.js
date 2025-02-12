"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controllers_1 = __importDefault(require("./todo.controllers"));
const midleware_1 = require("../auth/midleware");
const router = (0, express_1.Router)();
router.get("/getAll", midleware_1.authMiddleware, todo_controllers_1.default.getAllProducts);
router.get("/getById/:id", midleware_1.authMiddleware, todo_controllers_1.default.getOne);
router.post("/create", midleware_1.authMiddleware, todo_controllers_1.default.createProducts);
router.put("/update/:id", midleware_1.authMiddleware, todo_controllers_1.default.updateProducts);
router.delete("/delete/:id", midleware_1.authMiddleware, todo_controllers_1.default.deleteOnproducts);
router.delete("/deleteAllMy", midleware_1.authMiddleware, todo_controllers_1.default.deleteAllUserProducts);
router.delete("/deleteAll", midleware_1.authMiddleware, midleware_1.adminMiddleware, todo_controllers_1.default.deleteAll);
// router.get("/get-product/:id", authMiddleware, todoControllers."");
// router.get("/search/:value", todoControllers.getOne);
exports.default = router;
