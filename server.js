import express from "express";
import appRouter from "./app/routes/App.routes.js";
import invocationRouter from "./app/routes/Invocation.routes.js";
const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/invoc", invocationRouter);
app.use("/", appRouter);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
