import { NextApiRequest, NextApiResponse } from "next";
import { users } from "@/data/users";
import bcrypt from "bcryptjs";
import { serialize } from "cookie";
import crypto from "crypto";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const { firstName, lastName, email, password, role, employerType } = req.body;

  // Check if user exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }

  // Hash password
  const hashedPassword = bcrypt.hashSync(password, 10);

  const sessionToken = crypto.randomUUID();

  const newUser = {
    id: users.length + 1,
    firstName,
    lastName,
    email,
    password: hashedPassword,
    role,
    employerType,
    sessionToken,
  };
  newUser.sessionToken = sessionToken;
  users.push(newUser);

  console.log("Current users: ", users);

  // Set cookie
  res.setHeader(
    "Set-Cookie",
    serialize("sessionToken", sessionToken, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    })
  );

  return res.status(201).json({ message: "Account created successfully" });
}
