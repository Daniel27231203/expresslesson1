interface ITodoRequest {
  title: string;
  id: number;
  price: number;
}

import { Request } from "express";

// Расширяем интерфейс Request для добавления email
export interface AuthRequest extends Request {
  email?: string; // Это свойство будет доступно в req.email
}
