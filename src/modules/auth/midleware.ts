import { Request, Response, NextFunction, response } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
  email?: string;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
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
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      email: string;
    };
    req.email = decoded.email;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

export const adminMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const myEmail = req.email; // Проверяем email в user, а не в body
  console.log("🚀 ~ myEmail:", myEmail);
  if (myEmail !== "daniel@gmail.com") {
    res.status(401).json({ error: "У вас нет доступа" });
  }
  next();
};
