/*
  Warnings:

  - Added the required column `userId` to the `Owner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Owner" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Owner" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
