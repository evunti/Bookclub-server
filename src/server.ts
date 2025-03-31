// import { createServer } from "http";
// import { handler } from "./handler";
import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
