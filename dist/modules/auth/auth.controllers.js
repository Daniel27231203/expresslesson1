"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const registerUser = async (req, res) => {
    try {
        const { email, password, name, profilePhoto } = req.body;
        if (!email || !password)
            res.status(400).json({ message: "Please provide email and password" });
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser)
            res.status(400).json({ message: "Email already exists" });
        const hashPassword = await bcrypt.hash(password, 7);
        await prisma.user.create({
            data: { email, password: hashPassword, name, profilePhoto },
        });
        const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });
        res.json({ message: "Success sign-up", accessToken: token });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Server Error" });
    }
};
// const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   const user = data.find((u) => u.email === email);
//   if (!user || !(await bcrypt.compare(user.password, password)))
//     res.status(401).json({ message: "Invalid credentials" });
//   const token = jwt.sign({ email }, process.env.JWT_SECRET, {
//     expiresIn: "1h",
//   });
//   res.json({ message: "success login", token });
// };
// const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (!token) return res.status(401).json({ message: "Access denied" });
//   jwt.verify(token, process.env.JWT_SECRET as string, (err, email) => {
//     if (err) return res.status(403).json({ message: "Invalid token" });
//     (req as any).email = email;
//     next();
//   });
// };
exports.default = {
    registerUser,
    //   login,
    //   authenticateToken,
};
