import express from "express";
import cors from "cors";
import morgan from "morgan";
import booksRoutes from "./routes/books.route.js";
import authRoutes from "./routes/auth.route.js";

const app = express();

/* Middlewares */
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

/* Default Port */
const port = 8080;

app.get("/", (req, res) => {
  res.status(201).json("Welcome home!");
});

/* Defining routes */
app.use("/api/v1/", booksRoutes);
app.use("/api/auth/", authRoutes);

app.listen(port);
