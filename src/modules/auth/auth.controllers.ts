import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const bcrypt = require("bcryptjs");
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name, profilePhoto } = req.body;

    if (!email || !password)
      res.status(400).json({ message: "Please provide email and password" });

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) res.status(400).json({ message: "Email already exists" });

    const hashPassword = await bcrypt.hash(password, 7);
    await prisma.user.create({
      data: { email, password: hashPassword, name, profilePhoto },
    });

    const token = await jwt.sign({ email }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.json({ message: "Success sign-up", accessToken: token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server Errorr" });
  }
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401).json({ message: "Invalid credentials" });
  }

  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = await jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.json({ message: "success login", token });
};

const getProfile = async (req: Request, res: Response) => {
  // @ts-ignore
  const email = req.email;
  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) res.status(404).json({ message: "User not found" });

    res.json({ message: "it's your profile", user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server Errorr" });
  }
};
export default {
  registerUser,
  login,
  getProfile,
};
