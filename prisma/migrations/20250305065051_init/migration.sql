-- CreateEnum
CREATE TYPE "InvocationStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'COMPLETE', 'CANCEL');

-- CreateTable
CREATE TABLE "Invocation" (
    "id" SERIAL NOT NULL,
    "status" "InvocationStatus" NOT NULL,
    "text" TEXT NOT NULL,
    "theme" TEXT NOT NULL,

    CONSTRAINT "Invocation_pkey" PRIMARY KEY ("id")
);
