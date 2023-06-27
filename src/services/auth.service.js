import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
    //Validations
    if (!email) {
      return { message: "Email is required" };
    }
    if (!password) {
      return { message: "Password is required" };
    }
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      //If user exists and credentials are valid, create token
      const token = jwt.sign(
        {
          userId: user.id,
          userEmail: user.email,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1h",
        }
      );

      delete user.password;
      user.token = token;

      return { user };
    }
    return { message: "Invalid email or password" };
  } catch (error) {
    return error;
  }
};

export { registerUser, loginUser };
