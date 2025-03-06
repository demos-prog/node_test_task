export class InvocationService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async getAll() {
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
        data: { status: newStatus },
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
        },
      });
      return invocation;
    } catch (error) {
      console.error("Error creating invocation:", error);
      throw error;
    }
  }
}
