import React from "react";
import { PillProps } from "@/interfaces";

const Pill: React.FC<PillProps> = ({ title, variant = "default" }) => {
  const baseStyles = "rounded-full";
  const variants =
    variant === "default"
      ? "bg-white border border-gray-300"
      : variant === "wallet"
      ? "bg-blue-500/20 border border-blue-600 text-blue-600 font-bold"
      : variant === "fnb"
      ? "bg-none border-2 border-yellow-400 text-yellow-500"
      : variant === "topRated"
      ? "bg-green-300/20 border-2 border-green-400 text-green-500"
      : variant === "recommended"
      ? "bg-none border-2 border-blue-400 text-blue-500"
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
