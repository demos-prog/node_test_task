-- CreateEnum
CREATE TYPE "InvocationStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'COMPLETE', 'CANCEL');

-- CreateTable
CREATE TABLE "Invocation" (
    "id" TEXT NOT NULL,
    "status" "InvocationStatus" NOT NULL,
    "text" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invocation_pkey" PRIMARY KEY ("id")
);
