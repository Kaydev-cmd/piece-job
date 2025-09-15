import React from "react";
import { RecentPaymentsCardProps } from "@/interfaces";
import Pill from "./Pill";

const RecentPayments: React.FC<RecentPaymentsCardProps> = ({
  id,
  jobTitle,
  date,
  price,
}) => {
  return (
    <div>
      {/* Summary goes here... */}
      <div className="flex flex-col gap-2" style={{ padding: "6px" }}>
        <div className="flex justify-between items-center text-xl">
          <h2 className="text-slate-800 font-semibold">{jobTitle}</h2>
          <p className="text-blue-500 font-bold">+R{price}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-slate-500 font-semibold">{date}</p>
          <Pill title="Completed" variant="default" />
        </div>
        <hr className="text-slate-300" style={{ marginTop: "8px" }} />
      </div>
    </div>
  );
};

export default RecentPayments;
