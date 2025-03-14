import { Router } from "express";
import { InvocationService } from "../services/invocation.service.js";
import { validateId } from "../middlewares/idValidation.js";
import { schemaInvocation } from "../schemas/invocation.schema.js";
import { schemaStatus } from "../schemas/status.schema.js";
import { schemaSolution } from "../schemas/solution.schema.js";
import { schemaCancel } from "../schemas/cancel.schema.js";

export class InvocationRoutes {
  constructor(prisma) {
    this.router = Router();
    this.invocationService = new InvocationService(prisma);
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", this.getAll.bind(this));
    this.router.get("/:id", validateId, this.getById.bind(this));
    this.router.patch("/", this.cancelAllInProgress.bind(this));
    this.router.patch("/compl/:id", validateId, this.completion.bind(this));
    this.router.patch("/cancel/:id", validateId, this.cancel.bind(this));
    this.router.patch("/:id", validateId, this.setStatus.bind(this));
    this.router.post("/", this.create.bind(this));
  }

  async getAll(req, res) {
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;

    const invocations = await this.invocationService.getAll(startDate, endDate);
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

  async setStatus(req, res) {
    try {
      await schemaStatus.validateAsync(req.body);
      const newStatus = req.body.status;

      const invocation = await this.invocationService.setStatus(
        req.params.id,
        newStatus
      );

      if (!invocation) {
        res
          .status(404)
          .send(JSON.stringify({ message: "Invocation not found" }));
        return;
      }

      res.send(invocation);
    } catch (error) {
      res.status(400).send(JSON.stringify({ message: error.message }));
      return;
    }
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

  async cancelAllInProgress(_, res) {
    const result = await this.invocationService.cancelAllInProgress();
    res.send(result);
  }

  async completion(req, res) {
    try {
      await schemaSolution.validateAsync(req.body);
      const solution = req.body.solution;
      const result = await this.invocationService.completion(
        req.params.id,
        solution
      );
      res.send(result);
    } catch (error) {
      res.status(400).send(JSON.stringify({ message: error.message }));
    }
  }

  async cancel(req, res) {
    try {
      await schemaCancel.validateAsync(req.body);
      const cancel = req.body.cancel;
      const result = await this.invocationService.cancel(req.params.id, cancel);
      res.send(result);
    } catch (error) {
      res.status(400).send(JSON.stringify({ message: error.message }));
    }
  }

  getRouter() {
    return this.router;
  }
}
