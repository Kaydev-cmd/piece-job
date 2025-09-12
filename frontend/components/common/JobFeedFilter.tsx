import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";

const JobFeedFilter = () => {
  return (
    <div
      className="border border-blue-500 rounded-lg cursor-pointer"
      style={{ padding: "12px" }}
    >
      <FaFilter color="#1D4ED8" size={16} />
    </div>
  );
};

export default JobFeedFilter;
