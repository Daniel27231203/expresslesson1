"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        res.status(401).json({ error: "Access denied" });
        return;
    }
    const token = authHeader.split(" ")[1]; // ✅ Извлекаем сам токен
    if (!token) {
        res.status(401).json({ error: "Invalid token" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.email = decoded.email;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};
exports.authMiddleware = authMiddleware;
const adminMiddleware = (req, res, next) => {
    const myEmail = req.email; // Проверяем email в user, а не в body
    console.log("🚀 ~ myEmail:", myEmail);
    if (myEmail !== "daniel@gmail.com") {
        res.status(401).json({ error: "У вас нет доступа" });
    }
    next();
};
exports.adminMiddleware = adminMiddleware;
