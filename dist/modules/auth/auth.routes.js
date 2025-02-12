"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controllers_1 = __importDefault(require("./auth.controllers"));
const midleware_1 = require("./midleware");
const router = (0, express_1.Router)();
router.post("/register", auth_controllers_1.default.registerUser);
router.post("/login", auth_controllers_1.default.login);
router.get("/getProfile", midleware_1.authMiddleware, auth_controllers_1.default.getProfile);
router.get("/getAllProfile", midleware_1.authMiddleware, midleware_1.adminMiddleware, auth_controllers_1.default.getAllProfile);
router.delete("/deleteAccount/:id", midleware_1.authMiddleware, midleware_1.adminMiddleware, auth_controllers_1.default.deleteAccount);
router.delete("/deleteAllAccount", midleware_1.authMiddleware, midleware_1.adminMiddleware, auth_controllers_1.default.deleteAll);
exports.default = router;
