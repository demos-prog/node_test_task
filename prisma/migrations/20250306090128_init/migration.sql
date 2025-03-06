-- CreateEnum
CREATE TYPE "InvocationStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'COMPLETE', 'CANCELLED');

-- CreateTable
CREATE TABLE "Invocation" (
    "id" TEXT NOT NULL,
    "status" "InvocationStatus" NOT NULL,
    "text" TEXT NOT NULL,
    "theme" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL,

    CONSTRAINT "Invocation_pkey" PRIMARY KEY ("id")
);
