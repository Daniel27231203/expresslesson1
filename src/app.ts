import { config } from "dotenv";
config();
import express from "express";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { readFileSync } from "fs";

// Определяем путь к swagger.json
const swaggerPath = path.join(process.cwd(), "src", "swagger.json");

// Читаем содержимое swagger.json
const swaggerDocumentation = JSON.parse(readFileSync(swaggerPath, "utf-8"));

export const buildServer = () => {
  const server = express();
  server.use(express.json());

  // Подключаем Swagger UI
  server.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocumentation)
  );

  // Добавляем роут для получения swagger.json
  server.get("/swagger.json", (req, res) => {
    res.status(200).json(swaggerDocumentation);
  });

  // Основной роут
  server.get("/", (req, res) => {
    res.status(200).send({ message: "Server is Working" });
  });

  server.use("/api/v1", routes);

  return server;
};
