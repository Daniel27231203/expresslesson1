import { config } from "dotenv";
config();
import express from "express";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { readFileSync } from "fs";
import cors from "cors";

const swaggerPath = path.join(process.cwd(), "src", "swagger.json");

const swaggerDocumentation = JSON.parse(readFileSync(swaggerPath, "utf-8"));

export const buildServer = () => {
  const server = express();
  server.use(express.json());
  server.use(
    cors({
      origin: [
        "http://localhost:5173",
        "http://localhost:3000",
        "http://localhost:5000",
      ],
    })
  );

  server.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocumentation)
  );

  server.get("/swagger.json", (req, res) => {
    res.status(200).json(swaggerDocumentation);
  });

  server.get("/", (req, res) => {
    res.status(200).send({ message: "Server is Working" });
  });

  server.use("/api/v1", routes);

  return server;
};
