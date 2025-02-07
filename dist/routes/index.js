"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cors_1 = __importDefault(require("cors"));
const todo_routes_1 = __importDefault(require("../modules/todo/todo.routes"));
const auth_routes_1 = __importDefault(require("../modules/auth/auth.routes"));
const corsConfig = {
    origin: [
        "http://localhost:5000",
        "https://localhost:3000",
        "https://expresslesson1.onrender.com",
    ],
};
const router = (0, express_1.Router)();
router.use("/todo", (0, cors_1.default)(corsConfig), todo_routes_1.default);
router.use("/auth", (0, cors_1.default)(corsConfig), auth_routes_1.default);
exports.default = router;
