import asyncHandler from "express-async-handler";
import { getAll } from "../services/books.service.js";

const createBook = asyncHandler(async (req, res, next) => {
  res.send("NOT IMPLEMENTED: Book delete GET");
});

const getBooks = asyncHandler(async (req, res) => {
  try {
    let books = await getAll();
    return res.json({ data: books });
  } catch (error) {
    return res.status(501).json({ error: error });
  }
});

export { createBook, getBooks };
