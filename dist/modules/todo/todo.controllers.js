"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllTodo = async (req, res) => {
    try {
        res.status(200).send({
            success: true,
            results: prisma.todo.findMany(),
        });
    }
    catch (e) {
        console.log(`error in ${e}`);
        res.status(500).send({
            success: false,
            message: "Error fetching todos",
        });
    }
};
const createTodo = async (req, res) => {
    try {
        const { title } = req.body;
        const newTodo = {
            id: prisma.todo.findMany.length + 1,
            title,
        };
        prisma.todo.create({ data: newTodo });
        res.status(200).send({
            message: "successfyl",
            data: newTodo,
        });
    }
    catch (e) {
        res.status(500).send({
            message: `server error: ${e}`,
        });
    }
};
const updateTodo = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { title } = req.body;
        const updatedProduct = await prisma.todo.update({
            where: { id },
            data: { title },
        });
        if (updatedProduct) {
            res.status(200).send({
                message: "Product updated successfully",
                data: updatedProduct,
            });
        }
        else {
            res.status(404).send({ message: "извините но такого продукта нет!" });
        }
    }
    catch (err) {
        res.status(500).send({ message: "Server error" });
    }
};
const deleteOnTodo = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const newTodo = prisma.todo.delete({ where: { id } });
        res.status(200).send({
            message: `successfuly deleted`,
            data: newTodo,
        });
    }
    catch (e) {
        res.status(500).send({
            message: `server error: ${e}`,
        });
    }
};
exports.default = {
    getAllTodo,
    createTodo,
    deleteOnTodo,
    updateTodo,
};
