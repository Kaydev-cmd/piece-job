import React from "react";
import { WhyChooseUsStatsCardProps } from "@/interfaces";
import { LuUsersRound } from "react-icons/lu";
import { FaMoneyBill } from "react-icons/fa";

const WhyChooseUsStatsCard: React.FC<WhyChooseUsStatsCardProps> = ({
  id,
  statDetails,
  statDescription,
  variant = "primary",
}) => {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`${
          variant === "primary"
            ? "bg-gradient-to-r from-blue-800 to-blue-500"
            : "bg-orange-500"
        } rounded-full`}
        style={{ padding: "12px" }}
      >
        {variant === "primary" ? (
          <LuUsersRound size={20} color="#fff"/>
        ) : (
          <FaMoneyBill size={20} color="#fff"/>
        )}
      </div>
      <div>
        <h1 className="font-semibold">{statDetails}</h1>
        <p className="text-slate-500">{statDescription}</p>
      </div>
    </div>
  );
};

export default WhyChooseUsStatsCard;
