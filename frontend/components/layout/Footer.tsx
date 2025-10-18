import React from "react";
import { FiFacebook, FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="container flex flex-col items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2">
          {/* Icon here... */}
          <p
            className="text-white font-bold text-center bg-[linear-gradient(135deg,#1D4ED8,#10B981)] rounded-xl w-10"
            style={{ padding: "8px" }}
          >
            P
          </p>
          <h1 className="font-bold text-xl">PieceJob</h1>
        </div>

        {/* Description here... */}
        <p className="text-slate-500 text-center">
          Where skills meet opportunity. Connect with flexible work
          opportunities and turn your skills into income with instant payments
        </p>

        {/* Icons here... */}
        <div className="flex items-center gap-4">
          {/* Facebook */}
          <div
            className="bg-white border-1 border-gray-300 rounded-lg"
            style={{ padding: "12px" }}
          >
            <FiFacebook size={20} />
          </div>

          {/* Twitter */}
          <div
            className="bg-white border-1 border-gray-300 rounded-lg"
            style={{ padding: "12px" }}
          >
            <FiTwitter size={20} />
          </div>
          <div
            className="bg-white border-1 border-gray-300 rounded-lg"
            style={{ padding: "12px" }}
          >
            <FiInstagram size={20} />
          </div>
          <div
            className="bg-white border-1 border-gray-300 rounded-lg"
            style={{ padding: "12px" }}
          >
            <FiLinkedin size={20} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
