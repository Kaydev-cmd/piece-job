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
