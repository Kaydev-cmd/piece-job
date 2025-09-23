export interface LayoutProps {
  children: React.ReactNode;
}

export interface ButtonProps {
  title: string;
  variant: string;
  onClick?: () => void;
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

export interface JobFeedCardProps {
  id: number;
  image?: string;
  userName: string;
  timePosted: string;
  rating: number;
  jobTitle: string;
  price: number;
  duration: string;
  location: string;
  distance: string;
  skills: string[];
  description: string;
  onApply: () => void;
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
  jobTitle: string;
  description: string;
  location: string;
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
  jobTitle: string;
  description: string;
  location: string;
  pay: number;
  duration: string;
}

export interface JobPostData {
  id: number;
  jobTitle: string;
  description: string;
  location: string;
  payRate: number;
  duration: string;
  specialRequirements?: string;
}

export interface JobPostContextType {
  jobData: Partial<JobPostData>;
  updateJobData: (data: Partial<JobPostData>) => void;
  resetJobData: () => void;
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

export interface JobSeekerProfileCardProps {
  id: number;
  userImage: string;
  userName: string;
  userAge: number;
  userLocation: string;
  userRating: number;
  numberOfReviews: number;
  skills: string[];
  description: string;
}
