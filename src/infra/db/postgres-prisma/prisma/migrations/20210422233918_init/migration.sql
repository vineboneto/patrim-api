/*
  Warnings:

  - You are about to drop the column `placeId` on the `Patrimony` table. All the data in the column will be lost.
  - You are about to drop the `Place` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserPlace` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Patrimony` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserPlace" DROP CONSTRAINT "UserPlace_placeId_fkey";

-- DropForeignKey
ALTER TABLE "UserPlace" DROP CONSTRAINT "UserPlace_userId_fkey";

-- DropForeignKey
ALTER TABLE "Patrimony" DROP CONSTRAINT "Patrimony_placeId_fkey";

-- AlterTable
ALTER TABLE "Patrimony" DROP COLUMN "placeId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Place";

-- DropTable
DROP TABLE "UserPlace";

-- AddForeignKey
ALTER TABLE "Patrimony" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
