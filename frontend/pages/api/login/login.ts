import { NextApiRequest, NextApiResponse } from "next";
import { users } from "@/data/users";
import bcrypt from "bcryptjs";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }
  const { email, password } = req.body;

  // Check if user exists
  const user = users.find(
    (user) => user.email.toLowerCase() === email.toLowerCase()
  );

  if (!user) {
    return res.status(401).json({ message: "no such user" });
  }

  // compare password
  const isPasswordValid = bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid password" });
  }
  // return sucess response
  return res.status(200).json({
    success: true,
    user: {
      email: user.email,
      role: user.role || "jobSeeker",
    },
  });
}
