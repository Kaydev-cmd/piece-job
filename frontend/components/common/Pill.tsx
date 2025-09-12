import React from "react";
import { PillProps } from "@/interfaces";

const Pill: React.FC<PillProps> = ({ title }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-full" style={{ padding: "8px 12px" }}>
      <p>{title}</p>
    </div>
  );
};

export default Pill;
