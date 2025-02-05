import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllTodo = async (req: Request, res: Response) => {
  const responseData = await prisma.todo.findMany();
  try {
    res.status(200).send({
      success: true,
      results: responseData,
    });
  } catch (e) {
    console.log(`error in ${e}`);
    res.status(500).send({
      success: false,
      message: "Error fetching todos",
    });
  }
};

const createTodo = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;
    const newTodo = {
      title,
    };

    const responseData = await prisma.todo.create({ data: newTodo });
    res.status(200).send({
      message: "successfyl",
      data: responseData,
    });
  } catch (e) {
    res.status(500).send({
      message: `server error: ${e}`,
    });
  }
};

const getOne = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const todo = await prisma.todo.findUnique({ where: { id } });
  if (todo) {
    try {
      res.status(200).send({
        message: "success",
        data: todo,
      });
    } catch (e) {
      res.status(404).send({ message: "извините но такого продукта нет!" });
    }
  } else {
    res.status(404).send({ message: "извините но такого продукта нет!" });
  }
};

const updateTodo = async (req: Request, res: Response) => {
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
    } else {
      res.status(404).send({ message: "извините но такого продукта нет!" });
    }
  } catch (err) {
    res.status(500).send({ message: "Server error" });
  }
};

const deleteOnTodo = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const newTodo = await prisma.todo.delete({ where: { id } });
    res.status(200).send({
      message: `successfuly deleted`,
      data: newTodo,
    });
  } catch (e) {
    res.status(500).send({
      message: `server error: ${e}`,
    });
  }
};

export default {
  getAllTodo,
  createTodo,
  deleteOnTodo,
  updateTodo,
  getOne,
};
