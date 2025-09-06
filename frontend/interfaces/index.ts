export interface LayoutProps {
  children: React.ReactNode;
}

export interface ButtonProps {
  title: string;
  variant: string;
  onClick?: () => void;
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