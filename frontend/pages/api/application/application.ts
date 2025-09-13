import { NextApiRequest, NextApiResponse } from "next";
import { ApplicationFormValues } from "@/interfaces";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    console.log("Application sent successfully", req.body);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const data: ApplicationFormValues = req.body;
    console.log("Received user application data: ", data);
    return res.status(200).json({ message: "Application posted successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
