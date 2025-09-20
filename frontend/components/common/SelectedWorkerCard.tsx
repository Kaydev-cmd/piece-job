import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import { CHOSEN_WORKER_DATA } from "@/constants";
import ChosenWorkerCard from "./ChosenWorkerCard";

const SelectedWorkerCard = () => {
  return (
    <div
      className="card flex flex-col gap-4 bg-gray-300/30 rounded-xl"
      style={{ marginTop: "32px" }}
    >
      <div className="flex items-center gap-2">
        {/* Icon here... */}
        <AiOutlineUser size={30} color="#3B82F6" />
        <h1 className="text-2xl font-bold">Selected Worker</h1>
      </div>
      <p className="text-slate-500">Confirm payment to your chosen worker</p>

      {/* Chosen Worker Card here... */}
      <div>
        {CHOSEN_WORKER_DATA.map((worker) => (
          <ChosenWorkerCard
            key={worker.id}
            id={worker.id}
            initials={worker.initials}
            fullName={worker.fullName}
            rating={worker.rating}
            jobsCompleted={worker.jobsCompleted}
            status={worker.status}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectedWorkerCard;
