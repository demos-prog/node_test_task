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
          solution: "",
          cancelReason: "",
          createdAt: getTodayFormatted(),
          updatedAt: getTodayFormatted(),
        },
      });
      return invocation;
    } catch (error) {
      console.error("Error creating invocation:", error);
      throw error;
    }
  }

  async cancelAllInProgress() {
    try {
      const invocations = await this.prisma.invocation.updateMany({
        where: { status: "IN_PROGRESS" },
        data: { status: "CANCELLED", updatedAt: getTodayFormatted() },
      });
      return invocations;
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
  }

  async completion(id, solution) {
    try {
      const invocation = await this.prisma.invocation.update({
        where: { id },
        data: {
          status: "COMPLETE",
          solution: solution,
          updatedAt: getTodayFormatted(),
        },
      });
      return invocation;
    } catch (error) {
      console.error("Error completion:", error);
      throw error;
    }
  }

  async cancel(id, cancelReason) {
    try {
      const invocation = await this.prisma.invocation.update({
        where: { id },
        data: {
          status: "CANCELLED",
          cancelReason: cancelReason,
          updatedAt: getTodayFormatted(),
        },
      });
      return invocation;
    } catch (error) {
      console.error("Error cancel:", error);
      throw error;
    }
  }
}
