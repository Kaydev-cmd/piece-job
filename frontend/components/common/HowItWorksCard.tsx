import { HowItWorksCardProps } from "@/interfaces";
import { UserPlus, Search, CheckCircle, Banknote } from "lucide-react";

const HowItWorksCard: React.FC<HowItWorksCardProps> = ({
  variant = "UserPlus",
  title,
  description,
  color,
  textColor,
}) => {
  return (
    <div className=" flex flex-col gap-4 text-center items-center ">
      {/* Icon */}
      <div
        className={`w-16 h-16 ${color} ${textColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
      >
        {variant === "UserPlus" ? (
          <UserPlus className="h-8 w-8" size={30} />
        ) : variant === "Search" ? (
          <Search className="h-8 w-8" size={30} />
        ) : variant === "CheckCircle" ? (
          <CheckCircle className="h-8 w-8" size={30} />
        ) : variant === "Banknote" ? (
          <Banknote className="h-8 w-8" size={30} />
        ) : (
          ""
        )}
      </div>

      {/* Content */}
      <h4 className="text-lg font-semibold ">{title}</h4>
      <p className="text-slate-500">{description}</p>
    </div>
  );
};

export default HowItWorksCard;
