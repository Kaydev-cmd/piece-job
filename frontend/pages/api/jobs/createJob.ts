import { NextApiRequest, NextApiResponse } from "next";
import { JobDetailsFormProps } from "@/interfaces";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    console.log("Job posted successfully", req.body);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const data: JobDetailsFormProps = req.body;
    console.log("Received job details data: ", data);
    return res
      .status(200)
      .json({ message: "Job details created successfully" });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
