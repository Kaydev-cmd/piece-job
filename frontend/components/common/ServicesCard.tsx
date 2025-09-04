import React from "react";
import { ServicesCardProps } from "@/interfaces";
import { MdOutlinePhoneAndroid, MdOutlineShield } from "react-icons/md";
import { RxLightningBolt } from "react-icons/rx";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { TiStarOutline } from "react-icons/ti";
import { IoMdTime } from "react-icons/io";

const ServicesCard: React.FC<ServicesCardProps> = ({
  id,
  serviceTitle,
  serviceDescription,
  variant = "Mobile Phone",
}) => {
  return (
    <div className="card flex flex-col gap-2 bg-white shadow-md rounded-lg">
      {variant === "Mobile Phone" ? (
        <MdOutlinePhoneAndroid color="#2196F3" size={30} />
      ) : variant === "Instant Payments" ? (
        <RxLightningBolt color="#ed8936" size={30} />
      ) : variant === "Local Opportunities" ? (
        <HiOutlineLocationMarker color="#4CAF50" size={30} />
      ) : variant === "Build Reputation" ? (
        <TiStarOutline color="#2196F3" size={30} />
      ) : variant === "Flexible Hours" ? (
        <IoMdTime color="#ed8936" size={30} />
      ) : variant === "Secure Platform" ? (
        <MdOutlineShield color="#4CAF50" size={30} />
      ) : (
        ""
      )}
      <h1 className="font-bold text-lg">{serviceTitle}</h1>
      <p className="text-slate-500 font-medium">{serviceDescription}</p>
    </div>
  );
};

export default ServicesCard;
