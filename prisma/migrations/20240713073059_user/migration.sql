/*
  Warnings:

  - You are about to drop the column `intlPhoneNumber` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_intlPhoneNumber_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "intlPhoneNumber",
ADD COLUMN     "bornAgain" TEXT,
ADD COLUMN     "employmentStatus" TEXT,
ADD COLUMN     "maritalStatus" TEXT,
ADD COLUMN     "occupation" TEXT;
