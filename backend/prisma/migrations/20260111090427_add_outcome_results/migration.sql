/*
  Warnings:

  - The `reviewOutcome` column on the `Decision` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "outcomepurchase" AS ENUM ('YES', 'NO', 'DONTMATTER');

-- AlterTable
ALTER TABLE "Decision" DROP COLUMN "reviewOutcome",
ADD COLUMN     "reviewOutcome" "outcomepurchase";
