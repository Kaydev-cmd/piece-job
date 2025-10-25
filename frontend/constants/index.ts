import {
  Applicant,
  Header_Link,
  JobPosterProfileCardProps,
  JobSeekerProfileCardProps,
} from "@/interfaces";

export const HEADER_LINKS: Header_Link[] = [
  {
    id: 1,
    link: "Home",
    href: "/",
  },
  {
    id: 2,
    link: "About",
    href: "/about",
  },
  {
    id: 3,
    link: "Contact",
    href: "/contact",
  },
];

export const JOB_SEEKER_DROPDOWN_LINKS = [
  {
    id: 1,
    linkName: "View Jobs",
    href: "/job-feed",
  },
  {
    id: 2,
    linkName: "View Wallet",
    href: "/wallet",
  },
];

export const JOB_POSTER_DROPDOWN_LINKS = [
  {
    id: 1,
    linkName: "Post a Job",
    href: "/post-job",
  },
  {
    id: 2,
    linkName: "View Jobs Posted",
    href: "/job-poster-feed",
  },
  {
    id: 3,
    linkName: "View Jobs Applicants",
    href: "/job-applicants",
  },
];

export const MOBILE_LINKS = [
  {
    id: 1,
    link: "Home",
    href: "/",
  },
  {
    id: 2,
    link: "About",
    href: "/about",
  },
  {
    id: 3,
    link: "Contact",
    href: "/contact",
  },
  {
    id: 4,
    link: "Jobs",
    href: "/job-feed",
  },
  {
    id: 5,
    link: "Login",
    href: "/login",
  },
  {
    id: 6,
    link: "Signup",
    href: "/signup",
  },
];

export const FOR_JOB_SEEKERS_LINKS = [
  {
    id: 1,
    linkName: "Browse Jobs",
    path: "/job-feed",
  },
  {
    id: 2,
    linkName: "Create Profile",
    path: "#",
  },
  {
    id: 3,
    linkName: "How It Works",
    path: "#",
  },
  {
    id: 4,
    linkName: "Success Stories",
    path: "#",
  },
  {
    id: 5,
    linkName: "Download App",
    path: "#",
  },
];

export const FOR_JOB_POSTERS_LINKS = [
  {
    id: 1,
    linkName: "Post a Job",
    path: "/post-job",
  },
  {
    id: 2,
    linkName: "Find Workers",
    path: "#",
  },
  {
    id: 3,
    linkName: "Pricing",
    path: "#",
  },
  {
    id: 4,
    linkName: "Business Solutions",
    path: "#",
  },
  {
    id: 5,
    linkName: "Support",
    path: "#",
  },
];

export const FOOTER_LINKS = [
  {
    id: 1,
    linkName: "Privacy Policy",
    path: "#",
  },
  {
    id: 2,
    linkName: "Terms of Service",
    path: "#",
  },
  {
    id: 3,
    linkName: "Cookie Policy",
    path: "#",
  },
  {
    id: 4,
    linkName: "Help Center",
    path: "#",
  },
];

export const HERO_STATS = [
  {
    id: 1,
    statNumber: "1000+",
    statDescription: "Jobs Posted",
    variant: "primary",
  },
  {
    id: 2,
    statNumber: "500+",
    statDescription: "Workers Hired",
    variant: "secondary",
  },
  {
    id: 3,
    statNumber: "R50k+",
    statDescription: "Earned",
    variant: "tertiary",
  },
];

export const BANNER_STATS = [
  {
    id: 1,
    statNumber: "1000+",
    statTitle: "Active Jobs",
    statDescription: "Posted this month",
    variant: "primary",
  },
  {
    id: 2,
    statNumber: "R175",
    statTitle: "Average Hourly Rate",
    statDescription: "Across all categories",
    variant: "secondary",
  },
  {
    id: 3,
    statNumber: "4.8",
    statTitle: "Average Rating",
    statDescription: "Worker satisfaction",
    variant: "tertiary",
  },
];

export const WHY_CHOOSE_US_STATS = [
  {
    id: 1,
    statDetails: "500+ Workers",
    statDescription: "Already earning",
    variant: "primary",
  },
  {
    id: 2,
    statDetails: "R150/hour",
    statDescription: "Average rate",
    variant: "secondary",
  },
];

export const SERVICES_STATS = [
  {
    id: 1,
    serviceTitle: "Simple Mobile App",
    serviceDescription:
      "Browse jobs, apply instantly, and manage everything from your phone.",
    variant: "Mobile Phone",
  },
  {
    id: 2,
    serviceTitle: "Instant Payments",
    serviceDescription:
      "Get paid immediately after job completion via FNB eWallet.",
    variant: "Instant Payments",
  },
  {
    id: 3,
    serviceTitle: "Local Opportunities",
    serviceDescription:
      "Find work opportunities in your neighborhood and area.",
    variant: "Local Opportunities",
  },
  {
    id: 4,
    serviceTitle: "Build Reputation",
    serviceDescription:
      "Earn ratings and reviews to unlock better opportunities.",
    variant: "Build Reputation",
  },
  {
    id: 5,
    serviceTitle: "Flexible Hours",
    serviceDescription:
      "Work when you want, how you want, on your own schedule.",
    variant: "Flexible Hours",
  },
  {
    id: 6,
    serviceTitle: "Secure Platform",
    serviceDescription:
      "Safe payments and verified job posters for your protection.",
    variant: "Secure Platform",
  },
];

export const GET_PAID_INSTANTLY_DATA = [
  {
    id: 1,
    description: "FNB eWallet integration",
  },
  {
    id: 2,
    description: "PayMe & PayShap supported",
  },
  {
    id: 3,
    description: "SmartSave automatic savings",
  },
];

export const JOB_CATEGORIES = [
  {
    id: 1,
    variant: "GraduationCap",
    title: "Tutoring & Teaching",
    count: "150+ jobs",
    rate: "R120-200/hr",
  },
  {
    id: 2,
    variant: "Home",
    title: "Home Services",
    count: "200+ jobs",
    rate: "R100-180/hr",
  },
  {
    id: 3,
    variant: "Truck",
    title: "Delivery & Transport",
    count: "300+ jobs",
    rate: "R80-150/hr",
  },
  {
    id: 4,
    variant: "Wrench",
    title: "Handyman & Repairs",
    count: "120+ jobs",
    rate: "R150-250/hr",
  },
  {
    id: 5,
    variant: "Scissors",
    title: "Beauty & Wellness",
    count: "80+ jobs",
    rate: "R100-300/hr",
  },
  {
    id: 6,
    variant: "Camera",
    title: "Creative & Media",
    count: "90+ jobs",
    rate: "R200-400/hr",
  },
  {
    id: 7,
    variant: "Users",
    title: "Events & Hospitality",
    count: "110+ jobs",
    rate: "R120-220/hr",
  },
  {
    id: 8,
    variant: "Laptop",
    title: "Tech & Digital",
    count: "70+ jobs",
    rate: "R250-500/hr",
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    id: 1,
    variant: "UserPlus",
    title: "Create Your Profile",
    description:
      "Sign up in minutes and showcase your skills, experience, and availability",
    color: "bg-[linear-gradient(135deg,#1D4ED8,#10B981)]",
    textColor: "bg-[#F8FAFC] text-white",
  },
  {
    id: 2,
    variant: "Search",
    title: "Find Perfect Jobs",
    description:
      "Browse local opportunities that match your skills and schedule",
    color: "bg-orange-500",
    textColor: "text-white",
  },
  {
    id: 3,
    variant: "CheckCircle",
    title: "Complete & Get Rated",
    description:
      "Do great work, build your reputation, and unlock better opportunities",
    color: "bg-[linear-gradient(135deg,#10B981,#10B981)]",
    textColor: "text-white",
  },
  {
    id: 4,
    variant: "Banknote",
    title: "Get Paid Instantly",
    description:
      "Receive payment immediately via FNB eWallet as soon as job is done",
    color: "bg-[linear-gradient(135deg,#1D4ED8,#10B981)]",
    textColor: "bg-[#F8FAFC] text-white",
  },
];

export const TOTAL_EARNINGS_DATA = [
  {
    id: 1,
    totalEarnings: 2450.75,
    availableToWithdraw: 1980.5,
  },
];

export const RECENT_PAYMENTS_DATA = [
  {
    id: 1,
    jobTitle: "Garden Cleanup",
    date: "2024-01-15",
    price: 350,
  },
  {
    id: 2,
    jobTitle: "Data Entry Project",
    date: "2024-01-14",
    price: 200,
  },
  {
    id: 3,
    jobTitle: "Moving Help",
    date: "2024-01-12",
    price: 180,
  },
  {
    id: 4,
    jobTitle: "Logo Design",
    date: "2024-01-10",
    price: 500,
  },
];

export const WALLET_SUMMARY_DATA = [
  {
    id: 1,
    jobsCompleted: 12,
    averagePerJob: 204,
    savingsRate: 600,
    totalEarned: 2451,
  },
];

export const CHOSEN_WORKER_DATA = [
  {
    id: 1,
    initials: "TM",
    fullName: "Thendo Mukwevho",
    rating: 4.8,
    jobsCompleted: 47,
    status: "Top Rated",
  },
];

export const PAYMENT_SUMMARY_DATA = [
  {
    id: 1,
    jobPayment: 200,
    platformFee: 0.0,
    processingFee: 0.0,
    total: 200,
  },
];

export const JOB_SEEKER_PROFILE_DATA: JobSeekerProfileCardProps = {
  id: 1,
  userImage: "/assets/job_seeker_profile/john_doe.jpeg",
  lastName: "John Doe",
  userAge: 22,
  userLocation: "Johannesburg, Gauteng",
  userRating: 4.8,
  numberOfReviews: 24,
  skillSet: [
    {
      id: 1,
      skillName: "Driving",
      priorityLevel: "low",
    },
    {
      id: 2,
      skillName: "Data Entry",
      priorityLevel: "high",
    },
    {
      id: 3,
      skillName: "Gardening",
      priorityLevel: "moderate",
    },
  ],
  // description:
  //   "Hardworking student looking for part-time opportunities. Experienced in delivery, tutoring, and general assistance.",
};

export const JOB_POSTER_PROFILE_DATA: JobPosterProfileCardProps[] = [
  {
    id: 1,
    companyName: "Brian J.",
    // businessName: "Green Gardens Landscaping",
    companyAddress: "Cape Town, Western Cape",
    userImage: "/assets/job_seeker_profile/john_doe.jpeg",
    userRating: 4.9,
    numberOfReviews: 45,
    isVerified: true,
    postedJobs: 23,
    activeJobs: 3,
    biography:
      "Small landscaping business offering flexible work opportunities for motivated individuals.",
    // recentJobs: [
    //   {
    //     title: "Weekend Garden Maintenance",
    //     applicants: 8,
    //     status: "active",
    //     budget: 500,
    //     date: "2024-01-18",
    //   },
    //   {
    //     title: "Lawn Mowing Service",
    //     applicants: 12,
    //     status: "progress",
    //     budget: 300,
    //     date: "2024-01-16",
    //   },
    //   {
    //     title: "Plant Installation",
    //     applicants: 6,
    //     status: "completed",
    //     budget: 800,
    //     date: "2024-01-14",
    //   },
    // ],
  },
  {
    id: 2,
    companyName: "Simon K.",
    // businessName: "XYZ Incorporations",
    companyAddress: "Pretoria, Gauteng",
    userImage: "",
    userRating: 4.9,
    numberOfReviews: 45,
    isVerified: true,
    postedJobs: 23,
    activeJobs: 3,
    biography:
      "Small tech business offering flexible work opportunities for motivated individuals.",
    // recentJobs: [
    //   {
    //     title: "Weekend Garden Maintenance",
    //     applicants: 8,
    //     status: "active",
    //     budget: 500,
    //     date: "2024-01-18",
    //   },
    //   {
    //     title: "Lawn Mowing Service",
    //     applicants: 12,
    //     status: "progress",
    //     budget: 300,
    //     date: "2024-01-16",
    //   },
    //   {
    //     title: "Plant Installation",
    //     applicants: 6,
    //     status: "completed",
    //     budget: 800,
    //     date: "2024-01-14",
    //   },
    // ],
  },
];

export const JOB_SEEKER_REVIEWS_AND_RATINGS_DATA = [
  {
    id: 1,
    userImage: "",
    userName: "Thabo M.",
    description:
      "Very professional and completed the work on time. Highly recommend!",
    rating: 5,
  },
  {
    id: 2,
    userImage: "",
    userName: "Naledi K.",
    description: "Great attention to detail, but arrived a bit late.",
    rating: 4,
  },
  {
    id: 3,
    userImage: "",
    userName: "Sipho D.",
    description: "Did an excellent job and was very polite. Will hire again.",
    rating: 5,
  },
  {
    id: 4,
    userImage: "",
    userName: "Aisha P.",
    description: "Work was okay, but communication could be better.",
    rating: 3,
  },
  {
    id: 5,
    userImage: "",
    userName: "Lerato S.",
    description: "Outstanding service, went above and beyond my expectations.",
    rating: 5,
  },
];

export const JOB_SEEEKER_RECENT_JOBS_DATA = [
  {
    id: 1,
    jobTitle: "Package Delivery",
    client: "TechNova Solutions",
    description:
      "Deliver packages safely and on time to clients across the city.",
    date: "2025-09-24",
    rating: 5,
  },
  {
    id: 2,
    jobTitle: "Private Tutoring",
    client: "Creative Minds Agency",
    description:
      "Provide one-on-one tutoring sessions for students in various subjects.",
    date: "2025-09-22",
    rating: 5,
  },
  {
    id: 3,
    jobTitle: "Garden Maintenance",
    client: "WordCraft Media",
    description: "Maintain gardens by planting, watering, and trimming plants.",
    date: "2025-09-20",
    rating: 3.4,
  },
  {
    id: 4,
    jobTitle: "House Cleaning",
    client: "AppSphere Tech",
    description:
      "Clean homes and offices, including dusting, mopping, and organizing.",
    date: "2025-09-18",
    rating: 4,
  },
  {
    id: 5,
    jobTitle: "Data Entry Clerk",
    client: "MarketBoost Inc.",
    description: "Enter and manage data in spreadsheets and company databases.",
    date: "2025-09-15",
    rating: 3,
  },
  {
    id: 6,
    jobTitle: "Home Tutoring & Mentoring",
    client: "NextGen Designs",
    description:
      "Assist students with homework and provide mentorship for academic growth.",
    date: "2025-09-12",
    rating: 4,
  },
];

export const mockApplicants: Applicant[] = [
  {
    id: 1,
    userName: "Sarah Chen",
    userImage: "/assets/job_seeker_profile/john_doe.jpeg",
    rating: 4.9,
    reviewCount: 124,
    location: "San Francisco, CA",
    appliedDate: "2 hours ago",
    skillSet: [
      { skillName: "React" },
      { skillName: "TypeScript" },
      { skillName: "Node.js" },
      { skillName: "MongoDB" },
    ],
    experience: 5,
    hourlyRate: 85,
    status: "pending" as const,
  },
  {
    id: 2,
    userName: "Marcus Johnson",
    userImage: "/assets/job_seeker_profile/john_doe.jpeg",
    rating: 4.7,
    reviewCount: 89,
    location: "Austin, TX",
    appliedDate: "4 hours ago",
    skillSet: [
      { skillName: "Python" },
      { skillName: "Django" },
      { skillName: "PostgreSQL" },
      { skillName: "AWS" },
    ],
    experience: 3,
    hourlyRate: 75,
    status: "pending" as const,
  },
  {
    id: 3,
    userName: "Emily Rodriguez",
    userImage: "/assets/job_seeker_profile/john_doe.jpeg",
    rating: 4.8,
    reviewCount: 156,
    location: "New York, NY",
    appliedDate: "6 hours ago",
    skillSet: [
      { skillName: "Vue.js" },
      { skillName: "Laravel" },
      { skillName: "MySQL" },
      { skillName: "Docker" },
    ],
    experience: 4,
    hourlyRate: 80,
    status: "accepted" as const,
  },
  {
    id: 4,
    userName: "David Kim",
    userImage: "/assets/job_seeker_profile/john_doe.jpeg",
    rating: 4.6,
    reviewCount: 67,
    location: "Seattle, WA",
    appliedDate: "1 day ago",
    skillSet: [
      { skillName: "Angular" },
      { skillName: "C#" },
      { skillName: ".NET" },
      { skillName: "Azure" },
    ],
    experience: 6,
    hourlyRate: 90,
    status: "pending" as const,
  },
  {
    id: 5,
    userName: "Lisa Thompson",
    userImage: "/assets/job_seeker_profile/john_doe.jpeg",
    rating: 4.5,
    reviewCount: 43,
    location: "Chicago, IL",
    appliedDate: "1 day ago",
    skillSet: [
      { skillName: "React Native" },
      { skillName: "Swift" },
      { skillName: "Kotlin" },
      { skillName: "Firebase" },
    ],
    experience: 2,
    hourlyRate: 70,
    status: "rejected" as const,
  },
];
