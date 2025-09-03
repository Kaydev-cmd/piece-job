import React from "react";
import { HeroStatsCardProps } from "@/interfaces";
import { motion } from "framer-motion";

const HeroStatsCard: React.FC<HeroStatsCardProps> = ({
  statNumber,
  statDescription,
  variant = "primary",
}) => {
  const digits = statNumber.toString().split(""); // => Turns our statNumber into an array of digits

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="card flex flex-col justify-between items-center">
        <div className="flex items-center">
          {digits.map((digit, index) => (
            <motion.span
              key={index}
              className={`${
                variant === "primary"
                  ? "text-blue-600"
                  : variant === "secondary"
                  ? "text-orange-500"
                  : "text-green-500"
              } font-semibold text-3xl flex`}
              initial={{ rotateX: 0, opacity: 0 }}
              animate={{ rotateX: [0, 360, 0], opacity: 1 }}
              transition={{
                duration: 1.2,
                ease: "easeOut",
                delay: index * 0.5, // stagger per digit
              }}
              style={{ transformOrigin: "center" }}
            >
              {digit}
            </motion.span>
          ))}
        </div>
        <p className="text-slate-300">{statDescription}</p>
      </div>
    </motion.div>
  );
};

export default HeroStatsCard;
