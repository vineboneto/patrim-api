-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "accessToken" UUID,
    "role" TEXT,
    "email" TEXT NOT NULL,

    PRIMARY KEY ("id")
);
