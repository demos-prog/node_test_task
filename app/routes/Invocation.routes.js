import { Router } from "express";
import { InvocationService } from "../servecies/invocation.service.js";
import { validateId } from "../middlewares/idValidation.js";
import { schemaInvocation } from "../schemas/invocation.schema.js";

export class InvocationRoutes {
  constructor(prisma) {
    this.router = Router();
    this.invocationService = new InvocationService(prisma);
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", this.getAll.bind(this));
    this.router.get("/:id", validateId, this.getById.bind(this));
    this.router.patch("/:id", validateId, this.switchToProgress.bind(this));
    this.router.post("/", this.create.bind(this));
  }

  async getAll(_, res) {
    const invocations = await this.invocationService.getAll();
    res.send(invocations);
  }

  async getById(req, res) {
    const invocation = await this.invocationService.getById(req.params.id);
    if (!invocation) {
      res.status(404).send(JSON.stringify({ message: "Invocation not found" }));
      return;
    }
    res.send(invocation);
  }

  async switchToProgress(req, res) {
    const invocation = await this.invocationService.switchToProgress(
      req.params.id
    );
    if (!invocation) {
      res.status(404).send(JSON.stringify({ message: "Invocation not found" }));
      return;
    }
    res.send(invocation);
  }


  async create(req, res) {
    const requestBody = req.body;
    try {
      await schemaInvocation.validateAsync(requestBody);
      const result = await this.invocationService.create(requestBody);
      res.status(201).send(result);
    } catch (error) {
      res.status(400).send(JSON.stringify({ message: error.message }));
    }
  }

  getRouter() {
    return this.router;
  }
}
