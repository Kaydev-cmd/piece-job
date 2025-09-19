import React from "react";
import Button from "./Button";
import { PaymentSummaryCardProps } from "@/interfaces";
import { FaDollarSign } from "react-icons/fa6";

const PaymentSummaryCard: React.FC<PaymentSummaryCardProps> = ({
  id,
  jobPayment,
  processingFee,
  platformFee,
  total,
}) => {
  return (
    <div
      className="card flex flex-col gap-4 bg-gray-300/30 rounded-xl"
      style={{ marginTop: "32px" }}
    >
      <div className="flex gap-2 items-center">
        {/* Icon here... */}
        <FaDollarSign size={28} color="#22C55E" />
        <h1 className="font-bold text-2xl">Payment Summary</h1>
      </div>
      <div className="flex flex-col gap-2">
        {/* Job Payment Here... */}
        <div className="flex justify-between text-lg">
          <h2 className="text-slate-500">Job Payment</h2>
          <p className="font-semibold">R{jobPayment}</p>
        </div>

        {/* Platform Fee Here... */}
        <div className="flex justify-between text-lg">
          <h2 className="text-slate-500">Platform Fee</h2>
          <p className="font-semibold">R{platformFee}</p>
        </div>

        {/* Processing Fee Here... */}
        <div className="flex justify-between text-lg">
          <h2 className="text-slate-500">Processing Fee</h2>
          <p className="font-semibold">R{processingFee}</p>
        </div>

        <hr className="text-gray-300" />

        {/* Total here... */}
        <div className="flex justify-between items-center text-2xl">
          <h2 className="text-slate-500">Total</h2>
          <p className="font-bold text-blue-500">R{total}</p>
        </div>
      </div>

      <Button title={`Pay R${total} now`} variant="processPayment" />
    </div>
  );
};

export default PaymentSummaryCard;
