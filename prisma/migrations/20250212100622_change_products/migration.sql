/*
  Warnings:

  - You are about to drop the column `authorId` on the `Products` table. All the data in the column will be lost.
  - Added the required column `authorEmail` to the `Products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_authorId_fkey";

-- AlterTable
ALTER TABLE "Products" DROP COLUMN "authorId",
ADD COLUMN     "authorEmail" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Products" ADD CONSTRAINT "Products_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;
