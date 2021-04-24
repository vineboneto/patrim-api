/*
  Warnings:

  - Added the required column `userId` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Sector.name_unique";

-- DropIndex
DROP INDEX "Patrimony.number_unique";

-- DropIndex
DROP INDEX "Category.name_unique";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "SwapPatrimony" ALTER COLUMN "date" SET DATA TYPE TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Category" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
