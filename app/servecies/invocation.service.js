export class InvocationService {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async findAll() {
    const allInvocations = await this.prisma.invocation.findMany();
    return allInvocations;
  }

  async findById(id) {
    const invocation = await this.prisma.invocation.findUnique({
      where: { id },
    });
    return invocation;
  }

  async processInvocation(passedInvocation) {
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
