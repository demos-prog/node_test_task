import { Router } from "express";
import { InvocationService } from "../servecies/invocation.service";

export class InvocationRoutes {
  constructor(prisma) {
    this.router = Router();
    this.invocationService = new InvocationService(prisma);
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", this.getAll.bind(this));
    this.router.get("/:id", this.getById.bind(this));
    this.router.post("/", this.create.bind(this));
  }

  async getAll(req, res) {
    const invocations = await this.invocationService.getAll();
    res.send(invocations);
  }

  async getById(req, res) {
    const invocation = await this.invocationService.getById(req.params.id);
    res.send(invocation);
  }

  async create(req, res) {
    const requestBody = req.body;
    const result = await this.invocationService.create(requestBody);
    res.status(201).send(result);
  }

  getRouter() {
    return this.router;
  }
}
