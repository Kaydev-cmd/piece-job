import React from "react";
import RecentPayments from "@/components/common/RecentPayments";
import TotalEarnings from "@/components/common/TotalEarnings";
import {
  TOTAL_EARNINGS_DATA,
  RECENT_PAYMENTS_DATA,
  WALLET_SUMMARY_DATA,
} from "@/constants";
import { FaWallet } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import SmartSave from "@/components/common/SmartSave";
import WalletSummary from "@/components/common/WalletSummary";

const WalletPage = () => {
  return (
    <section
      className="container flex flex-col gap-8"
      style={{ paddingBottom: "0" }}
    >
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

      <div className="flex flex-col lg:grid grid-cols-2 gap-6">
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

        {/* SmartSave here... */}
        <div>
          <SmartSave />
        </div>

        {/* Recent Payments here... */}
        <div className="card flex flex-col gap-4 border border-gray-300 shadow-md rounded-xl">
          <div className="flex items-center gap-2">
            {/* Icon here... */}
            <FaRegClock size={20} />
            <h1 className="text-2xl font-bold">Recent Payments</h1>
          </div>

          <div className="flex flex-col gap-4">
            {RECENT_PAYMENTS_DATA.map((payment) => (
              <RecentPayments
                key={payment.id}
                id={payment.id}
                jobTitle={payment.jobTitle}
                date={payment.date}
                price={payment.price}
              />
            ))}
          </div>
        </div>

        {/* Wallet Summary here... */}
        <div>
          {WALLET_SUMMARY_DATA.map((summary) => (
            <WalletSummary
              key={summary.id}
              id={summary.id}
              jobsCompleted={summary.jobsCompleted}
              averagePerJob={summary.averagePerJob}
              savingsRate={summary.savingsRate}
              totalEarned={summary.totalEarned}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WalletPage;
