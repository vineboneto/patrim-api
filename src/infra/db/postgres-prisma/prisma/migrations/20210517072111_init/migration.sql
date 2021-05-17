/*
  Warnings:

  - Added the required column `userId` to the `SwapPatrimony` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SwapPatrimony" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "SwapPatrimony" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
