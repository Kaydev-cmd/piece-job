import TotalEarnings from "@/components/common/TotalEarnings";
import { TOTAL_EARNINGS_DATA } from "@/constants";
import React from "react";
import { FaWallet } from "react-icons/fa";

const WalletPage = () => {
  return (
    <section className="container flex flex-col gap-8" style={{ paddingBottom: "0" }}>
      <div className="flex items-center gap-4">
        {/* Icon here... */}
        <div
          className="bg-blue-500/20 rounded-full"
          style={{ padding: "12px" }}
        >
          <FaWallet size={30} color="#2196F3" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">My Wallet</h1>
          <p className="text-slate-500">
            Track your earnings and manage your money
          </p>
        </div>
      </div>

      {/* Total Earnings component goes here... */}
      <div>
        {TOTAL_EARNINGS_DATA.map((data) => (
          <TotalEarnings
            key={data.id}
            totalEarnings={data.totalEarnings}
            availableToWithdraw={data.availableToWithdraw}
          />
        ))}
      </div>
    </section>
  );
};

export default WalletPage;
