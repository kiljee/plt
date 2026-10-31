-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "extendedAt" TIMESTAMP(3),
ADD COLUMN     "followUpDueAt" TIMESTAMP(3),
ADD COLUMN     "followUpSentAt" TIMESTAMP(3);
