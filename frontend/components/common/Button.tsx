import React from "react";
import { ButtonProps } from "@/interfaces";
import { FaArrowRight } from "react-icons/fa6";
import { FaPlayCircle, FaGoogle, FaFilter } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  onClick,
  type,
  isActive,
}) => {
  const baseStyles = "flex justify-center items-center gap-4 font-semibold";

  const variantStyles =
    variant === "primary"
      ? "bg-gradient-to-r from-blue-800 to-blue-500 text-white"
      : variant === "secondary"
      ? "bg-white text-black flex flex-row-reverse"
      : variant === "tertiary"
      ? "bg-orange-500 text-white"
      : variant === "login"
      ? "bg-gradient-to-r from-blue-800 to-blue-500 text-white text-lg"
      : variant === "signup"
      ? "bg-white text-lg text-black hover:border-2 border-blue-600"
      : variant === "subscribe"
      ? "bg-blue-700 text-white"
      : variant === "google"
      ? "bg-white border border-slate-500 flex flex-row-reverse"
      : variant === "jobSeeker"
      ? "joiningAs flex flex-row-reverse focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      : variant === "employer"
      ? "joiningAs flex flex-row-reverse focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      : isActive
      ? "joiningAs flex flex-row-reverse focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      : variant === "seeMore"
      ? "border border-blue-600"
      : variant === "cancel"
      ? "bg-red-600 text-white"
      : "bg-green-500 text-white";

  const activeStyles = isActive
    ? "border-2 border-blue-600 ring-2 ring-blue-400"
    : "";

  return (
    <button
      onClick={onClick}
      type={type}
      className={`${baseStyles} ${variantStyles} ${activeStyles}`}
    >
      {title}
      {variant === "primary" ? (
        <FaArrowRight size={20} />
      ) : variant === "secondary" ? (
        <FaPlayCircle color="#000" size={20} />
      ) : variant === "google" ? (
        <FaGoogle color="#000" size={20} />
      ) : variant === "jobSeeker" ? (
        <GoDotFill color="#1447e6" />
      ) : variant === "employer" ? (
        <GoDotFill color="#ffa500" />
      ) : (
        ""
      )}
    </button>
  );
};

export default Button;
