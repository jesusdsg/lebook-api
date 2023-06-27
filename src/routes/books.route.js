import { Router } from "express";
import { createBook, getBooks } from "../controllers/books.controller.js";
const router = Router();

router.post("/books", createBook);

/* GET routes */
router.get("/books", getBooks);

export default router;
