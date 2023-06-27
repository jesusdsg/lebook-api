import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

/* Instance the prisma Client */
const prisma = new PrismaClient();

const registerUser = async (user) => {
  const { email, password } = user;
  try {
    //validate required
    if (!email || !password) {
      return { message: "Email and password are required" };
    }
    //validate email
    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (existingUser) {
      return { message: "This email is already registered" };
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    user.password = encryptedPassword;
    //register
    const newUser = prisma.user.create({
      data: user,
    });
    //Not to show fields
    delete (await newUser).password;

    return newUser;
  } catch (error) {
    return error;
  }
};

const loginUser = async (email, password) => {
  try {
    if (!email) {
      return { message: "Email is required" };
    }
    if (!password) {
      return { message: "Password is required" };
    }
  } catch (error) {
    return error;
  }
};

export { registerUser, loginUser };
