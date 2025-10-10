import React from "react";
import { BannerStatsProps } from "@/interfaces";
import { motion } from "framer-motion";

const BannerStatsCard: React.FC<BannerStatsProps> = ({
  statNumber,
  statTitle,
  statDescription,
  variant = "primary",
}) => {
  const digits = statNumber.toString().split("");

  return (
    <div className="text-center flex flex-col gap-1">
      <div>
        {digits.map((digit, index) => (
          <motion.span
            key={index}
            className={`${
              variant === "primary"
                ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500"
                : variant === "secondary"
                ? "text-orange-500"
                : variant === "tertiary"
                ? "text-green-500"
                : ""
            } font-bold text-3xl`}
            initial={{ rotateX: 0, opacity: 0 }}
            whileInView={{ rotateX: [0, 360, 0], opacity: 1 }}
            transition={{
              duration: 1.2,
              ease: "easeOut",
              delay: index * 0.5, // stagger per digit
            }}
            viewport={{ once: true, amount: 0.5 }}
            style={{ transformOrigin: "center" }}
          >
            {digit}
          </motion.span>
        ))}
      </div>
      <h2 className="text-sm font-bold text-slate-500">{statTitle}</h2>
      <p className="text-sm">{statDescription}</p>
    </div>
  );
};

export default BannerStatsCard;
