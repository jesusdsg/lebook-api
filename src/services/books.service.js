import { PrismaClient } from "@prisma/client";

/* Instence the prisma Client */
const prisma = new PrismaClient();

/* GET methods */
const getAll = async () => {
  try {
    let books = await prisma.Books.findMany();
    return books;
  } catch (error) {
    throw Error("Error while Paginating Books");
  }
};

export { getAll };
