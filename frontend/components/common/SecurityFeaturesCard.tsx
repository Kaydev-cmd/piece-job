import React from "react";
import { IoShieldOutline } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaRegClock } from "react-icons/fa";

const SecurityFeaturesCard = () => {
  return (
    <div
      className="card flex flex-col gap-4 bg-gray-300/30 rounded-xl"
      style={{ marginTop: "32px" }}
    >
      <h1 className="text-2xl font-bold">🔒 Security Features</h1>

      {/* Encrypted Payment here... */}
      <div className="flex items-center gap-2">
        {/* Icon here... */}
        <IoShieldOutline size={20} color="#3B82F6" />
        <p className="text-lg">FNB encrypted payment</p>
      </div>

      {/* Escrow protection here... */}
      <div className="flex items-center gap-2">
        {/* Icon here... */}
        <IoMdCheckmarkCircleOutline size={20} color="#22c55e" />
        <p className="text-lg">Escrow protection</p>
      </div>

      {/* Instant confirmation here... */}
      <div className="flex items-center gap-2">
        {/* Icon here... */}
        <FaRegClock size={20} color="#EAB308" />
        <p className="text-lg">Instant confirmation</p>
      </div>
    </div>
  );
};

export default SecurityFeaturesCard;
