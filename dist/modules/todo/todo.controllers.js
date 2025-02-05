"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data = [];
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
        const { title, price } = req.body;
        const newTodo = {
            id: data.length + 1,
            title,
            price,
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
const deleteOnTodo = async (req, res) => {
    const id = Number(req.params.id);
    try {
        const deletedProduct = data.filter((el) => el.id == id);
        const newTodo = data.filter((el) => el.id !== id);
        data.push(newTodo);
        res.status(200).send({
            message: `successfuly deleted: ${deletedProduct} `,
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
};
