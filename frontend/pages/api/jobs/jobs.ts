// import type { NextApiRequest, NextApiResponse } from "next";
// import { JobPostData } from "@/interfaces";

// // In-memory storage for jobs
// let JOB_FEED_DATA: JobPostData[] = [];

// // Normalize skills helper
// const normalizeSkills = (skills: unknown): string[] => {
//   if (Array.isArray(skills)) return skills;
//   if (typeof skills === "string") return skills.split(",").map((s) => s.trim());
//   return [];
// };

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === "GET") {
//     const query = (req.query.q as string) ?? "";

//     if (!query) {
//       return res.status(200).json(JOB_FEED_DATA);
//     }

//     const loweredQuery = query.toLowerCase();
//     const filteredJobs = JOB_FEED_DATA.filter((job) => {
//       const matchesTitle = job.title.toLowerCase().includes(loweredQuery);
//       const matchesLocation = job.location.toLowerCase().includes(loweredQuery);

//       const skillsArray = normalizeSkills(job.skills);

//       const matchesSkills = skillsArray.some((skill) =>
//         skill.toLowerCase().includes(loweredQuery)
//       );
//       return matchesTitle || matchesLocation || matchesSkills;
//     });

//     return res.status(200).json(filteredJobs);
//   }

//   if (req.method === "POST") {
//     const { jobTitle, description, location, payRate, duration, skills } =
//       req.body;

//     const newJob: JobPostData = {
//       id: JOB_FEED_DATA.length + 1,
//       userName: "Simon K.", //  Make this dynamic later
//       timePosted: "Just now", // Make this dynamic later
//       rating: 4.6, // Make this dynamic later
//       title: jobTitle,
//       description,
//       location,
//       payRate: payRate ?? 250,
//       duration: duration ?? "2 hours",
//       skills: normalizeSkills(skills),
//     };

//     JOB_FEED_DATA.push(newJob);
//     return res.status(201).json(newJob);
//   }

//   if (req.method === "PUT") {
//     const { id, ...updatedFields } = req.body;

//     JOB_FEED_DATA = JOB_FEED_DATA.map((job) =>
//       job.id === id ? { ...job, ...updatedFields } : job
//     );

//     return res.status(200).json(JOB_FEED_DATA.find((job) => job.id === id));
//   }

//   if (req.method === "DELETE") {
//     const id = Number(req.query.id);
//     JOB_FEED_DATA = JOB_FEED_DATA.filter((job) => job.id !== id);

//     return res.status(200).json({ message: "Job deleted successfully" });
//   }

//   return res.status(405).json({ message: `Method ${req.method} not allowed` });
// }
