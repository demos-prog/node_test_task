import { getTodayFormatted } from "../utils/getTodayFormatted.js";

export class InvocationService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async getAll(startDate, endDate) {
    if (startDate && endDate) {
      const allInvocations = await this.prisma.invocation.findMany({
        where: {
          createdAt: {
            gte: startDate,
            lte: endDate,
          },
        },
      });
      return allInvocations;
    }

    if (startDate) {
      const allInvocations = await this.prisma.invocation.findMany({
        where: {
          createdAt: startDate,
        },
      });
      return allInvocations;
    }

    const allInvocations = await this.prisma.invocation.findMany();
    return allInvocations;
  }

  async getById(id) {
    const invocation = await this.prisma.invocation.findUnique({
      where: { id },
    });
    return invocation;
  }

  async setStatus(id, newStatus) {
    try {
      const invocation = await this.prisma.invocation.update({
        where: { id },
        data: { status: newStatus, updatedAt: getTodayFormatted() },
      });
      return invocation;
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  }

  async create(passedInvocation) {
    try {
      const invocation = await this.prisma.invocation.create({
        data: {
          status: "NEW",
          text: passedInvocation.text,
          theme: passedInvocation.theme,
          createdAt: getTodayFormatted(),
          updatedAt: getTodayFormatted(),
          solution: "",
        },
      });
      return invocation;
    } catch (error) {
      console.error("Error creating invocation:", error);
      throw error;
    }
  }
}
