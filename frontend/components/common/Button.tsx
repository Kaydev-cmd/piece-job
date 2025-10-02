import React from "react";
import { ButtonProps } from "@/interfaces";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { FaPlayCircle, FaGoogle } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { LuDownload } from "react-icons/lu";
import { MdArrowOutward } from "react-icons/md";
import { RxLightningBolt } from "react-icons/rx";

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  className,
  onClick,
  type,
  isActive,
}) => {
  const baseStyles = `flex justify-center items-center gap-4 font-semibold ${className}`;

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
      ? "bg-white border border-slate-300 flex flex-row-reverse"
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
      : variant === "withdraw"
      ? "bg-blue-700 text-white flex flex-row-reverse"
      : variant === "history"
      ? "bg-white border border-slate-300"
      : variant === "fnbAccount"
      ? "bg-white border border-slate-300 flex flex-row-reverse"
      : variant === "back"
      ? "bg-white border border-slate-300 flex flex-row-reverse"
      : variant === "processPayment"
      ? "bg-green-500 flex flex-row-reverse text-white"
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
      ) : variant === "withdraw" ? (
        <LuDownload color="#fff" size={20} />
      ) : variant === "fnbAccount" ? (
        <MdArrowOutward size={20} />
      ) : variant === "back" ? (
        <FaArrowLeft size={20} />
      ) : variant === "processPayment" ? (
        <RxLightningBolt size={20} />
      ) : (
        ""
      )}
    </button>
  );
};

export default Button;
