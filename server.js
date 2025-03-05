import express from "express";
import appRouter from "./app/routes/App.routes.js";
import { InvocationRoutes } from "./app/routes/Invocation.routes.js";
import { InvocationService } from "./app/servecies/invocation.service.js";

const app = express();
const port = process.env.PORT;

const invocationRoutes = new InvocationRoutes(new InvocationService());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/invoc", invocationRoutes.getRouter());
app.use("/", appRouter);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
