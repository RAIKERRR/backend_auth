import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import {
generateAccessToken,
generateRefreshToken
} from "../utils/generateToken";
import {
registerSchema,
loginSchema
} from "../validations/auth.validation";

export const register = async (req: Request, res: Response) => {
try {
// Validate input
const validatedData = registerSchema.parse(req.body);

 const user = await registerUser(validatedData);

res.status(201).json({
  success: true,
  message: "User registered successfully",
  user
});

} catch (error: any) {
res.status(400).json({
success: false,
message: error.message || "Registration failed"
});
}
};

export const login = async (req: Request, res: Response) => {
try {
// Validate input
const validatedData = loginSchema.parse(req.body);


const user = await loginUser(validatedData);

const accessToken = generateAccessToken(user._id.toString());
const refreshToken = generateRefreshToken(user._id.toString());

res.status(200).json({
  success: true,
  message: "Login successful",
  accessToken,
  refreshToken
});


} catch (error: any) {
res.status(400).json({
success: false,
message: error.message || "Login failed"
});
}
};
