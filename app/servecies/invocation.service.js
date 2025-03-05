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

  async create(passedInvocation) {
    const invocation = await this.prisma.invocation.create({
      data: {
        status: passedInvocation.status,
        text: passedInvocation.text,
        theme: passedInvocation.theme,
      },
    });

    return invocation;
  }
}
