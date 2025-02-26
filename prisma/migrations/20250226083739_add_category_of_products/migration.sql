/*
  Warnings:

  - Added the required column `category` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Category" AS ENUM ('GADGETS', 'TECHNICS', 'CLOTHES_MEN', 'CLOTHES_WOMEN', 'CONSTRUCTION_EQUIPMENT', 'BOOKS');

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "category" "Category" NOT NULL;
