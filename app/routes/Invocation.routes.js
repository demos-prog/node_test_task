import { Router } from "express";
const invocationRouter = Router();

invocationRouter.get("/", (req, res) => {
  res.send("invoc");
});

invocationRouter.get("/:id", (req, res) => {
  res.send(req.params.id);
});

invocationRouter.post("/", (req, res) => {
  const requestBody = req.body;

  res.status(201).send(requestBody);
});

export default invocationRouter;
