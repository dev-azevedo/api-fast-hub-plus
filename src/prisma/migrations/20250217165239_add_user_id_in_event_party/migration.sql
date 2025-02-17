/*
  Warnings:

  - You are about to drop the column `eventId` on the `reservations` table. All the data in the column will be lost.
  - You are about to drop the `events` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `eventPartyId` to the `reservations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reservations" DROP CONSTRAINT "reservations_eventId_fkey";

-- AlterTable
ALTER TABLE "reservations" DROP COLUMN "eventId",
ADD COLUMN     "eventPartyId" TEXT NOT NULL;

-- DropTable
DROP TABLE "events";

-- CreateTable
CREATE TABLE "events_parties" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "amountTickets" INTEGER NOT NULL,
    "amountReservations" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "events_parties_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "events_parties" ADD CONSTRAINT "events_parties_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservations" ADD CONSTRAINT "reservations_eventPartyId_fkey" FOREIGN KEY ("eventPartyId") REFERENCES "events_parties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
