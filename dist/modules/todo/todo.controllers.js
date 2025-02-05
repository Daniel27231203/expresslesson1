"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let data = [];
const getAllTodo = async (req, res) => {
    try {
        res.status(200).send({
            success: true,
            results: data,
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
            id: data.length + 1,
            title,
        };
        data.push(newTodo);
        res.status(200).send({
            message: "successfyl",
            data: data,
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
        const updatedProduct = data.find((item) => item.id === id);
        if (updatedProduct) {
            updatedProduct.title = title;
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
        const newTodo = data.filter((el) => el.id !== id);
        data = newTodo;
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
