import React from "react";
import { RxLightningBolt } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import Pill from "./Pill";

const InstantPaymentsCard = () => {
  return (
    <div className="card flex flex-col gap-4">
      <div className="flex items-center gap-2">
        {/* Icon here... */}
        <RxLightningBolt size={20} color="#EAB308" />
        <h1 className="text-2xl font-bold">Instant Payments Ready</h1>
      </div>
      <div className="flex flex-col gap-2">
        {/* FNB eWallet Integration here... */}
        <div className="flex items-center gap-2">
          {/* Icon here... */}
          <TiTick size={20} />
          <p>FNB eWallet integration</p>
        </div>

        {/* Secure Payments Processing here... */}
        <div className="flex items-center gap-2">
          {/* Icon here... */}
          <TiTick size={20} />
          <p>Secure payment processing</p>
        </div>

        {/* Get paid immediately goes here... */}
        <div className="flex items-center gap-2">
          {/* Icon here... */}
          <TiTick size={20} />
          <p>Workers get paid immediately</p>
        </div>

        {/* Pill here... */}
        <div className="flex" style={{ marginTop: "12px" }}>
          <Pill title="Powered by FNB" variant="fnb" />
        </div>
      </div>
    </div>
  );
};

export default InstantPaymentsCard;
