/*
  Warnings:

  - You are about to drop the column `name` on the `LogError` table. All the data in the column will be lost.
  - Added the required column `stack` to the `LogError` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LogError" DROP COLUMN "name",
ADD COLUMN     "stack" TEXT NOT NULL;
