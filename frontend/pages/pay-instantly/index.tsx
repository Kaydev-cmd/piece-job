import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";
import SelectedWorkerCard from "@/components/common/SelectedWorkerCard";
import PaymentMethodCard from "@/components/common/PaymentMethodCard";
import PaymentSummaryCard from "@/components/common/PaymentSummaryCard";
import { PAYMENT_SUMMARY_DATA } from "@/constants";
import SecurityFeaturesCard from "@/components/common/SecurityFeaturesCard";

const PayInstantlyPage = () => {
  const router = useRouter();

  return (
    <section
      className="container flex flex-col"
      style={{ paddingTop: "0", paddingBottom: "0" }}
    >
      {/* Back to Home here... */}
      <div className="flex justify-center">
        <button
          className="flex items-center gap-2 text-blue-500"
          style={{ padding: "24px" }}
          onClick={() => router.push("/")}
        >
          {/* Icon here... */}
          <FaArrowLeft size={12} />
          Back to Home
        </button>
      </div>

      {/* Heading here... */}
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl font-bold text-center">
          Pay{" "}
          <span className="bg-[linear-gradient(135deg,#1D4ED8,#10B981)] bg-clip-text text-transparent">
            Instantly
          </span>
        </h1>
        <p className="text-center text-slate-500">
          Secure payment via FNB integration
        </p>
      </div>

      {/* Selected Worker Card here... */}
      <div>
        <SelectedWorkerCard />
      </div>

      {/* Payment Method Card here... */}
      <div>
        <PaymentMethodCard />
      </div>

      {/* Payment Summary Card here... */}
      <div>
        {PAYMENT_SUMMARY_DATA.map((summary) => (
          <PaymentSummaryCard
            key={summary.id}
            id={summary.id}
            jobPayment={summary.jobPayment}
            platformFee={summary.platformFee}
            processingFee={summary.processingFee}
            total={summary.total}
          />
        ))}
      </div>

      {/* Security Features here... */}
      <div>
        <SecurityFeaturesCard />
      </div>
    </section>
  );
};

export default PayInstantlyPage;
