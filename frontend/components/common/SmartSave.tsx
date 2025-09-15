import React, { useState } from "react";
import Button from "./Button";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const SmartSave = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="card flex flex-col gap-2 bg-green-500/10 rounded-xl">
      <h1 className="text-3xl font-bold">SmartSave</h1>
      <p className="text-slate-500">
        Automatically save a percentage of your earnings
      </p>

      {/* AutoSave here... */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl">Auto-save 15%</h2>
          <p className="text-slate-500">FNB Savings Account</p>
        </div>

        {/* Switch here... */}
        <button
          onClick={() => setEnabled(!enabled)}
          className={`relative inline-flex h-8 w-11 items-center rounded-full transition-colors ${
            enabled ? "bg-blue-600" : "bg-gray-300"
          }`}
          style={{ padding: "0" }}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              enabled ? "translate-x-6" : "translate-x-1"
            }`}
          ></span>
        </button>
      </div>

      {/* If SmartSave is active */}
      {enabled && (
        <div className="flex flex-col gap-6">
          <hr className="text-slate-400" style={{ marginTop: "16px" }} />
          <div
            className="card flex flex-col gap-2 bg-green-600/10 rounded-xl"
            style={{ marginTop: "16px" }}
          >
            <div className="flex items-center gap-2">
              {/* Icon here... */}
              <IoMdCheckmarkCircleOutline size={30} color="#22c55e" />
              <h3 className="text-2xl">SmartSave Active</h3>
            </div>
            <p className="text-slate-500">
              15% of your next payment will be automatically saved to your FNB
              account.
            </p>
          </div>
          <div className="flex justify-center">
            {/* CTA here... */}
            <Button title="View your FNB Account" variant="fnbAccount" />
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartSave;
