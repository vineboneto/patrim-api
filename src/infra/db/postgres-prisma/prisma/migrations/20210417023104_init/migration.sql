/*
  Warnings:

  - You are about to drop the column `userId` on the `Place` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Place` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Sector` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `placeId` to the `Patrimony` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Place" DROP CONSTRAINT "Place_userId_fkey";

-- AlterTable
ALTER TABLE "Patrimony" ADD COLUMN     "placeId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Place" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "Category.name_unique" ON "Category"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Place.name_unique" ON "Place"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Sector.name_unique" ON "Sector"("name");

-- AddForeignKey
ALTER TABLE "Patrimony" ADD FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;
