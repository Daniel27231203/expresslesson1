import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthRequest } from "../../types/schema";

const prisma = new PrismaClient();

// ? get products start

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const responseData = await prisma.products.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            profilePhoto: true,
            isAdmin: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      results: responseData,
    });
  } catch (e) {
    console.error(`Error fetching products:`, e);
    res.status(500).json({
      success: false,
      message: "Error fetching products",
    });
  }
};

const getOne = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const products = await prisma.products.findUnique({
    where: { id },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          profilePhoto: true,
          isAdmin: true,
        },
      },
    },
  });
  if (products) {
    try {
      res.status(200).send({
        message: "success",
        data: products,
      });
    } catch (e) {
      res.status(404).send({ message: "извините но такого продукта нет!" });
    }
  } else {
    res.status(404).send({ message: "извините но такого продукта нет!" });
  }
};

// ? get products end

// ? createProduct start
const createProducts = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, price, image, description } = req.body;
    const userEmail = req.email; // Берем email из мидлвары

    if (!userEmail) throw new Error("User email is required");

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) throw new Error("User not found");

    const newProduct = await prisma.products.create({
      data: {
        title,
        price: Number(price), // Приводим к числу
        image,
        description,
        authorEmail: user.email, // Теперь связываем по email
      },
    });

    res
      .status(201)
      .json({ message: "Product created successfully", data: newProduct });
  } catch (e) {
    next(e);
  }
};
// ? createProduct end

// ? update product start
const updateProducts = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { title, price, image, description } = req.body;
    const userEmail = req.email;

    const product = await prisma.products.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!product) {
      throw res.status(404).json({ message: "Продукт не найден!" });
    }

    if (product.author.email !== userEmail) {
      throw res
        .status(403)
        .json({ message: "Вы не являетесь автором этого продукта!" });
    }

    const updatedProduct = await prisma.products.update({
      where: { id },
      data: { title, price, image, description },
    });

    res.status(200).json({
      message: "Продукт успешно обновлён",
      data: updatedProduct,
    });
  } catch (err) {
    console.error("Ошибка обновления продукта:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

//? update product end

// ? deleteProducts start
const deleteOnproducts = async (req: AuthRequest, res: Response) => {
  try {
    const id = Number(req.params.id);
    const userEmail = req.email;

    const newproducts = await prisma.products.findUnique({
      where: { id },
      include: { author: true },
    });
    if (!newproducts) {
      throw res.status(404).json({ message: "Продукт не найден!" });
    }
    if (newproducts.author.email !== userEmail) {
      throw res
        .status(403)
        .json({ message: "Вы не являетесь автором этого продукта!" });
    }

    const deleteProduct = await prisma.products.delete({ where: { id: id } });
    res.status(200).send({
      message: `successfuly deleted`,
      data: deleteProduct,
    });
  } catch (e) {
    res.status(500).send({
      message: `server error: ${e}`,
    });
  }
};
const deleteAllUserProducts = async (req: AuthRequest, res: Response) => {
  try {
    const userEmail = req.email;

    const user = await prisma.user.findUnique({
      where: { email: userEmail },
      include: { products: true },
    });

    if (!user) {
      throw res.status(404).json({ message: "Пользователь не найден!" });
    }

    if (user.products.length === 0) {
      throw res
        .status(404)
        .json({ message: "У вас нет продуктов для удаления!" });
    }

    await prisma.products.deleteMany({
      where: { authorEmail: userEmail },
    });

    res.status(200).json({ message: "Все ваши продукты удалены!" });
  } catch (err) {
    console.error("Ошибка удаления продуктов:", err);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

const deleteAll = async (req: Request, res: Response) => {
  try {
    await prisma.products.deleteMany();
    res.status(200).send({ message: "All productss deleted successfully" });
  } catch (e) {
    res.status(500).send({ message: "Server error" });
  }
};

// ? deleteProduct end

// ! didnt work
/* const searchMany = async (req: Request, res: Response) => {
  const value = String(req.query.value);
  if (!value.trim()) {
    return res.status(400).send({
      success: false,
      message: "value is required",
    });
  }
  try {
    const responseData = await prisma.products.findMany();
    const response = responseData.filter((el) =>
      el.title.toLowerCase().includes(value?.toLowerCase())
    );
    res.status(200).send({
      success: true,
      results: response,
    });
  } catch (e) {
    console.log(`error in ${e}`);
    res.status(500).send({
      success: false,
      message: "Error fetching productss",
    });
  }
}*/

// const getUserProducts = async (req: Request, res: Response) => {
//   try {
//     const { userId } = req.params;

//     const products = await prisma.products.findMany({
//       where: { authorId: Number(userId) },
//     });

//     if (!products.length) {
//       return res.status(404).json({ message: "Продукты не найдены" });
//     }

//     res.status(200).json({
//       message: "Продукты пользователя",
//       data: products,
//     });
//   } catch (e) {
//     res.status(500).json({ message: `Ошибка сервера: ${e}` });
//   }
// };

// !

export default {
  getAllProducts,
  createProducts,
  deleteOnproducts,
  updateProducts,
  getOne,
  deleteAll,
  deleteAllUserProducts,
  // searchMany,
  // getUserProducts,
};
