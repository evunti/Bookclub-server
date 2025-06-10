// import { createServer } from "http";
// import { handler } from "./handler";
import express from "express";
import { booksRouter } from "./routes/books";
import { usersRouter } from "./routes/users";
import { authRouter } from "./routes/auth";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Api Routes
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/", booksRouter);

app.listen(process.env.PORT || 8000, () => {
  console.log(`Listening on port ${process.env.PORT || 8000}`);
});
