-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "options" TEXT NOT NULL DEFAULT '[]';

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "expectedAmount" INTEGER,
ADD COLUMN     "optionSelections" TEXT NOT NULL DEFAULT '[]';
