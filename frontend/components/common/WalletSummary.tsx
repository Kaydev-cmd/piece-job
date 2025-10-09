import React from "react";
import { WalletSummaryCardProps } from "@/interfaces";

const WalletSummary: React.FC<WalletSummaryCardProps> = ({
  jobsCompleted,
  averagePerJob,
  savingsRate,
  totalEarned,
}) => {
  return (
    <div className="card flex flex-col gap-4 border border-gray-300 shadow-md rounded-xl">
      <h1 className="text-2xl font-bold">This Month</h1>

      {/* Jobs Completed */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg text-slate-500">Jobs Completed</h2>
        <p>{jobsCompleted}</p>
      </div>

      {/* Average Per Job */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg text-slate-500">Average per Job</h2>
        <p>R{averagePerJob}</p>
      </div>

      {/* Savings Rate */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg text-slate-500">Savings Rate</h2>
        <p>R{savingsRate}</p>
      </div>

      <hr className="text-slate-300" />

      {/* Total Earned */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg text-slate-500">Total Earned</h2>
        <p className="text-blue-500 font-bold">R{totalEarned}</p>
      </div>
    </div>
  );
};

export default WalletSummary;
