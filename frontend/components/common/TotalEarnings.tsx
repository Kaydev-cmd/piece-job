import React from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import Pill from "./Pill";
import Button from "./Button";
import { TotalEarningsCardProps } from "@/interfaces";
import { IoShieldOutline } from "react-icons/io5";
import { TiTick } from "react-icons/ti";

const TotalEarnings: React.FC<TotalEarningsCardProps> = ({
  totalEarnings,
  availableToWithdraw,
}) => {
  return (
    <div className="card bg-blue-500/20 flex flex-col gap-4 rounded-xl">
      <div className="flex justify-between items-center">
        <div className="text-blue-600 flex items-center gap-2">
          {/* Icon here... */}
          <FaArrowTrendUp size={20} />
          <h1 className="text-2xl">Total Earnings</h1>
        </div>

        {/* Pill goes here... */}
        <Pill title="Verified" variant="wallet" />
      </div>

      <div className="flex flex-col gap-2">
        {/* Total earnings goes here... */}
        <h2 className="text-3xl text-blue-600 font-bold">R{totalEarnings}</h2>

        {/* Available to withdraw goes here... */}
        <p className="text-slate-500">
          Available to withdraw: R{availableToWithdraw}
        </p>
      </div>

      {/* CTA goes here... */}
      <div className="flex flex-col gap-3">
        <Button title="Withdraw Now" variant="withdraw" />
        <Button title="View History" variant="history" />
      </div>

      <hr className="text-slate-400" />

      {/* Features go here... */}
      <div className="flex items-center justify-between lg:justify-start lg:gap-4">
        <div className="flex items-center gap-2">
          {/* Icon here... */}
          <IoShieldOutline color="#22c55e" size={20} />
          <p>Bank-level security</p>
        </div>
        <div className="flex items-center gap-2">
          {/* Icon here... */}
          <TiTick color="#22c55e" size={20} />
          <p>Instant Transfers</p>
        </div>
      </div>
    </div>
  );
};

export default TotalEarnings;
