-- CreateEnum
CREATE TYPE "DecisionType" AS ENUM ('Purchase', 'Subscription');

-- CreateEnum
CREATE TYPE "confidenceLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "Decision" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "amount" DOUBLE PRECISION NOT NULL,
    "type" "DecisionType" NOT NULL,
    "confidence" "confidenceLevel" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reviewAt" TIMESTAMP(3),
    "reviewOutcome" TEXT,
    "reviewedAt" TIMESTAMP(3),
    "userId" TEXT NOT NULL,

    CONSTRAINT "Decision_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Decision" ADD CONSTRAINT "Decision_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
