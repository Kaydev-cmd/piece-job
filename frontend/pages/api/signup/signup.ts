import { NextApiRequest, NextApiResponse } from "next";
import { SignupFormValues } from "@/interfaces";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    console.log("Account created successfully", req.body);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const data: SignupFormValues = req.body;
    console.log("Received signup data: ", data);
    return res
      .status(200)
      .json({ message: "User account created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
