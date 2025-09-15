import React from "react";
import { PillProps } from "@/interfaces";

const Pill: React.FC<PillProps> = ({ title, variant = "default" }) => {
  const baseStyles = "rounded-full";
  const variants =
    variant === "default"
      ? "bg-white border border-gray-300"
      : variant === "wallet"
      ? "bg-blue-500/20 border border-blue-600 text-blue-600 font-bold"
      : "";

  return (
    <div
      className={`${baseStyles} ${variants}`}
      style={{ padding: "8px 12px" }}
    >
      <p>{title}</p>
    </div>
  );
};

export default Pill;
