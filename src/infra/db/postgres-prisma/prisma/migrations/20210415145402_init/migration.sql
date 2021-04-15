/*
  Warnings:

  - A unique constraint covering the columns `[number]` on the table `Patrimony` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Patrimony.number_unique" ON "Patrimony"("number");
