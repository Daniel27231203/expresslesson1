"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controllers_1 = __importDefault(require("./auth.controllers"));
const router = (0, express_1.Router)();
router.post("/register", auth_controllers_1.default.registerUser);
// router.post("/login", authControlers.login);
exports.default = router;
