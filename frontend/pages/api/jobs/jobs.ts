// /pages/api/jobs/jobs.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { JobPostData } from "@/interfaces";

// In-memory storage for jobs
let JOB_FEED_DATA: JobPostData[] = [];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const query = (req.query.q as string) ?? "";

    if (!query) {
      return res.status(200).json(JOB_FEED_DATA);
    }

    const loweredQuery = query.toLowerCase();
    const filteredJobs = JOB_FEED_DATA.filter((job) => {
      const matchesTitle = job.jobTitle.toLowerCase().includes(loweredQuery);
      const matchesLocation = job.location.toLowerCase().includes(loweredQuery);
      const matchesSkills = job.skills.some((skill) =>
        skill.toLowerCase().includes(loweredQuery)
      );
      return matchesTitle || matchesLocation || matchesSkills;
    });

    return res.status(200).json(filteredJobs);
  }

  if (req.method === "GET") {
    return res.status(200).json(JOB_FEED_DATA);
  }

  if (req.method === "POST") {
    const { jobTitle, description, location, payRate, duration, skills } =
      req.body;

    const newJob: JobPostData = {
      id: JOB_FEED_DATA.length + 1,
      userName: "John K.", //  Make this dynamic later
      timePosted: "Just now", // Make this dynamic later
      rating: 4.6, // Make this dynamic later
      jobTitle,
      description,
      location,
      payRate: payRate ?? 250,
      duration: duration ?? "2 hours",
      skills: skills ?? [],
    };

    JOB_FEED_DATA.push(newJob);
    return res.status(201).json(newJob);
  }

  return res.status(405).json({ message: `Method ${req.method} not allowed` });
}
