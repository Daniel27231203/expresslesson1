"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todo_controllers_1 = __importDefault(require("./todo.controllers"));
const router = (0, express_1.Router)();
router.get("/getAll", todo_controllers_1.default.getAllTodo);
router.put("/update/:id", todo_controllers_1.default.updateTodo);
router.post("/create", todo_controllers_1.default.createTodo);
router.delete("/delete/:id", todo_controllers_1.default.deleteOnTodo);
router.get("/getById/:id", todo_controllers_1.default.getOne);
exports.default = router;
