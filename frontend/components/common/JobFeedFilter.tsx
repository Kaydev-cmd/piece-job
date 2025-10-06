import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import { JobFeedFilterProps } from "@/interfaces";
import { IoClose } from "react-icons/io5";
import Button from "./Button";

const JobFeedFilter: React.FC<JobFeedFilterProps> = ({ onApplyFilters }) => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState<string[]>([]);

  const handleApplyFilters = () => {
    onApplyFilters({ jobTitle, location, skills });
    setShowSideBar(false);
  };

  return (
    <>
      {/* Filter Button */}
      <div
        className="border border-blue-500 rounded-lg cursor-pointer"
        onClick={() => setShowSideBar(true)}
        style={{ padding: "8px" }}
      >
        <FaFilter color="#1D4ED8" size={16} />
      </div>

      {/* Sidebar Drawer */}
      <div
        className={`fixed inset-0 z-50 flex justify-end transition-opacity duration-300 ${
          showSideBar
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 transition-opacity duration-300"
          onClick={() => setShowSideBar(false)}
        />

        {/* Drawer Panel */}
        <div
          className={`bg-white w-80 h-full shadow-lg flex flex-col gap-4 transform transition-transform duration-300 ${
            showSideBar ? "translate-x-0" : "translate-x-full"
          }`}
          style={{ padding: "24px" }}
        >
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-blue-900">Filter Jobs</h2>
            <button
              onClick={() => setShowSideBar(false)}
              className="text-gray-500 hover:text-blue-600 text-lg"
              style={{ padding: 0 }}
            >
              <IoClose size={30} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <label className="font-semibold text-sm text-gray-700">
                Job Title
              </label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g., Developer"
                className="w-full border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-sm text-gray-700">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., Durban"
                className="w-full border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="font-semibold text-sm text-gray-700">
                Skills
              </label>
              <input
                type="text"
                value={skills.join(", ")}
                onChange={(e) =>
                  setSkills(
                    e.target.value.split(",").map((skill) => skill.trim())
                  )
                }
                placeholder="e.g., Communication"
                className="w-full border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2" style={{ marginTop: "auto" }}>
            <Button
              title="Apply Filters"
              onClick={handleApplyFilters}
              variant="subscribe"
            />
            <Button
              title="Clear"
              onClick={() => {
                setJobTitle("");
                setLocation("");
                setSkills([]);
                onApplyFilters({});
              }}
              variant="seeMore"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default JobFeedFilter;
