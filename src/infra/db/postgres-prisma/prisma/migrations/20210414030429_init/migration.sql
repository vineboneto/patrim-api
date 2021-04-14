/*
  Warnings:

  - Made the column `sectorId` on table `Owner` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Owner" ALTER COLUMN "sectorId" SET NOT NULL;
