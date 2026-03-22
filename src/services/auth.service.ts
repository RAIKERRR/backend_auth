import User from "../models/user.model";
import { hashPassword } from "../utils/hashPassword";
import { comparePassword } from "../utils/comparePassword";

export const registerUser = async (data: any) => {
  const { name, email, phone, password } = data;

  const existingUser = await User.findOne({
    $or: [{ email }, { phone }]
  });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await hashPassword(password);

  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword
  });

  return user;
};

export const loginUser = async (data: any) => {
  const { email, password } = data;

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  return user;
};