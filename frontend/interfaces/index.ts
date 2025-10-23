export interface LayoutProps {
  children: React.ReactNode;
}

export interface ButtonProps {
  title: string;
  variant: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  isActive?: boolean;
}

export interface HeroStatsCardProps {
  id: number;
  statNumber: string;
  statDescription: string;
  variant: string;
}

export interface WhyChooseUsStatsCardProps {
  id: number;
  statDetails: string;
  statDescription: string;
  variant: string;
}

export interface ServicesCardProps {
  id: number;
  serviceTitle: string;
  serviceDescription: string;
  variant: string;
}

export interface JobExpertiseCardProps {
  variant: string;
  title: string;
  count: string;
  rate: string;
}

export interface HowItWorksCardProps {
  variant: string;
  title: string;
  description: string;
  color: string;
  textColor: string;
}

export interface BannerStatsProps {
  id: number;
  statNumber: string;
  statTitle: string;
  statDescription: string;
  variant: string;
}

export interface SignupFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  termsAndConditions: string;
  role: "jobSeeker" | "employer";
  employerType?: "individual" | "business";
  companyName?: string;
  companyRegistration?: string;
  companyAddress?: string;
}

export interface LoginProps {
  username: string;
  password: string;
}

export interface JobFeedCardProps {
  id: number;
  image?: string;
  userName: string;
  timePosted: string;
  rating: number;
  title: string;
  payRate: number;
  duration: string;
  location: string;
  skills: SkillsProps[];
  description: string;
  onApply?: () => void;
}

export interface PillProps {
  title: string;
  variant: string;
}

export interface SearchBarProps {
  initialQuery?: string;
}

export interface ApplicationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  location: string;
  resume: string;
}

export interface TotalEarningsCardProps {
  totalEarnings: number;
  availableToWithdraw: number;
}

export interface RecentPaymentsCardProps {
  id: number;
  jobTitle: string;
  date: string;
  price: number;
}

export interface WalletSummaryCardProps {
  id: number;
  jobsCompleted: number;
  averagePerJob: number;
  savingsRate: number;
  totalEarned: number;
}

export interface StepProps {
  pageTracker: number;
  onNext: () => void;
  onBack: () => void;
}

export interface JobDetailsFormProps {
  title: string;
  description: string;
  location: string;
  skills: SkillsProps[];
}

export interface PaymentAndTimelineFormProps {
  payRate: number;
  duration: string;
}

export interface RequirementsAndReviewFormProps {
  specialRequirements: string;
}

export interface JobReviewCardProps {
  id: number;
  title: string;
  description: string;
  location: string;
  pay: number;
  duration: string;
  // skills: { skill: string }[];
}

export interface JobPostData {
  id: number;
  userName: string;
  timePosted: string;
  rating: number;
  title: string;
  description: string;
  location: string;
  payRate: number;
  duration: string;
  specialRequirements?: string;
  skills: SkillsProps[];
  onApply?: () => void;
}

export interface JobPostContextType {
  draftJob: Partial<JobPostData>;
  jobFeed: JobPostData[];
  postJob: (data?: Partial<JobPostData>) => Promise<void>;
  updateJobData: (data: Partial<JobPostData>) => void;
  resetJobData: () => void;
  editJob: (id: number, updatedFields: Partial<JobPostData>) => Promise<void>;
  deleteJob: (id: number) => Promise<void>;
  setJobFeed: React.Dispatch<React.SetStateAction<JobPostData[]>>;
}

export interface ChosenWorkerCardProps {
  id: number;
  initials: string;
  fullName: string;
  rating: number;
  jobsCompleted: number;
  status: string;
}

export interface PaymentSummaryCardProps {
  id: number;
  jobPayment: number;
  platformFee: number;
  processingFee: number;
  total: number;
}

export interface PaymentMethodFormProps {
  phoneNumber: string;
}

export interface SkillsProps {
  id?: number;
  skillName: string;
  priorityLevel?: string;
}

export interface JobSeekerProfileCardProps {
  id: number;
  userImage?: string;
  userName?: string;
  userAge?: number;
  userLocation?: string;
  userRating?: number;
  numberOfReviews?: number;
}

export interface JobSeekerSkillsCardProps {
  id: number;
  skills: SkillsProps[];
  description?: string;
}

export interface JobPosterProfileCardProps {
  id: number;
  userImage?: string;
  userName?: string;
  userAge?: number;
  userLocation?: string;
  userRating?: number;
  numberOfReviews?: number;
  isVerified?: boolean;
  postedJobs?: number;
  activeJobs?: number;
  biography?: string;
  businessName?: string;
}

export interface JobSeekerReviewsAndRatingsCardProps {
  id: number;
  userImage: string;
  userName: string;
  rating: number;
  description: string;
}

export interface JobSeekerRecentJobsCardProps {
  id: number;
  jobTitle: string;
  client: string;
  date: string;
  description: string;
  rating: number;
}

export interface EditJobModalProps {
  job: {
    id: number;
    jobTitle: string;
    description: string;
    location: string;
    payRate: number;
    duration: string;
    skills: SkillsProps[];
  };
  onClose: () => void;
  onSave: (data: any) => void;
}

export interface DeleteJobModalProps {
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
}

export interface JobFeedFilterProps {
  onApplyFilters: (filters: {
    jobTitle?: string;
    location?: string;
    skills?: string[];
  }) => void;
}

export interface Job {
  id: number;
  userName?: string;
  timePosted?: string;
  rating?: number;
  jobTitle: string;
  payRate: string;
  duration: string;
  location: string;
  skills?: SkillsProps[];
  description?: string;
}

export interface Applicant {
  id: number;
  userName: string;
  userImage?: string;
  rating?: number;
  reviewCount?: number;
  location?: string;
  appliedDate?: string;
  skillSet: SkillsProps[];
  experience?: number;
  hourlyRate?: number;
  status: "pending" | "accepted" | "rejected";
}

export interface ApplicantCardProps {
  applicant: Applicant;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}
