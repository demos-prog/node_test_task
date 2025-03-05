import { Router } from "express";

export class InvocationRoutes {
  constructor(invocationService) {
    this.router = Router();
    this.invocationService = invocationService;
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", this.getAllInvocations.bind(this));
    this.router.get("/:id", this.getInvocationById.bind(this));
    this.router.post("/", this.createInvocation.bind(this));
  }

  async getAllInvocations(req, res) {
    const invocations = await this.invocationService.findAll();
    res.send(invocations);
  }

  async getInvocationById(req, res) {
    res.send(req.params.id);
  }

  async createInvocation(req, res) {
    const requestBody = req.body;
    const result = await this.invocationService.processInvocation(requestBody);
    res.status(201).send(result);
  }

  getRouter() {
    return this.router;
  }
}
