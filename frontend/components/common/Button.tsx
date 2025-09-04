import React from "react";
import { ButtonProps } from "@/interfaces";
import { FaArrowRight } from "react-icons/fa6";
import { FaPlayCircle } from "react-icons/fa";

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${
        variant === "primary"
          ? "bg-gradient-to-r from-blue-800 to-blue-500 text-white"
          : variant === "secondary"
          ? "bg-white text-black"
          : variant === "tertiary"
          ? "bg-orange-500 text-white"
          : variant === "login"
          ? "bg-gradient-to-r from-blue-800 to-blue-500 text-white"
          : variant === "signup"
          ? "bg-white text-black"
          : variant === "subscribe"
          ? "bg-blue-700 text-white"
          : "bg-green-500 text-white"
      } flex items-center gap-4 font-semibold`}
    >
      {title}
      {variant === "primary" ? (
        <FaArrowRight size={20} />
      ) : variant === "secondary" ? (
        <FaPlayCircle color="#000" size={20} />
      ) : (
        ""
      )}
    </button>
  );
};

export default Button;
