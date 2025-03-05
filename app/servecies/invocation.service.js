import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class InvocationService {
  async findAll() {
    const allInvocations = await prisma.invocation.findMany();
    return allInvocations;
  }
}
