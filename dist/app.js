"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildServer = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
// Определяем путь к swagger.json
const swaggerPath = path_1.default.join(process.cwd(), "src", "swagger.json");
// Читаем содержимое swagger.json
const swaggerDocumentation = JSON.parse((0, fs_1.readFileSync)(swaggerPath, "utf-8"));
const buildServer = () => {
    const server = (0, express_1.default)();
    server.use(express_1.default.json());
    // Подключаем Swagger UI
    server.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocumentation));
    // Добавляем роут для получения swagger.json
    server.get("/swagger.json", (req, res) => {
        res.status(200).json(swaggerDocumentation);
    });
    // Основной роут
    server.get("/", (req, res) => {
        res.status(200).send({ message: "Server is Working" });
    });
    server.use("/api/v1", routes_1.default);
    return server;
};
exports.buildServer = buildServer;
