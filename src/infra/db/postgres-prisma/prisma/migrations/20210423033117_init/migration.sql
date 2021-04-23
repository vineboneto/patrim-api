-- CreateTable
CREATE TABLE "SwapPatrimony" (
    "id" SERIAL NOT NULL,
    "oldOwnerId" INTEGER NOT NULL,
    "newOwnerId" INTEGER NOT NULL,
    "patrimonyId" INTEGER NOT NULL,
    "date" DATE NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SwapPatrimony" ADD FOREIGN KEY ("newOwnerId") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SwapPatrimony" ADD FOREIGN KEY ("oldOwnerId") REFERENCES "Owner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SwapPatrimony" ADD FOREIGN KEY ("patrimonyId") REFERENCES "Patrimony"("id") ON DELETE CASCADE ON UPDATE CASCADE;
