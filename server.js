import express from "express";
import appRouter from "./app/routes/App.routes.js";
import { PrismaClient } from "@prisma/client";
import { InvocationRoutes } from "./app/routes/Invocation.routes.js";

const app = express();
const port = process.env.PORT;
const prisma = new PrismaClient();
const invocationRoutes = new InvocationRoutes(prisma);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/invoc", invocationRoutes.getRouter());
app.use("/", appRouter);

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
