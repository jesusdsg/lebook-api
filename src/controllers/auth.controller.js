import asyncHandler from "express-async-handler";
import { registerUser, loginUser } from "../services/auth.service.js";

/**
 * Register functions with required parameters
 */
const signUp = asyncHandler(async (req, res) => {
  const userData = req.body;
  try {
    const newUser = await registerUser(userData);
    return res.status(200).json({ data: newUser });
  } catch (error) {
    res
      .status(500)
      .json({ error: { code: error.code, message: error.message } });
  }
});

/**
 * Login method
 */
const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginUser(email, password);
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

export { signUp, signIn };
