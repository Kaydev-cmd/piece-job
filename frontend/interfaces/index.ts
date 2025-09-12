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
