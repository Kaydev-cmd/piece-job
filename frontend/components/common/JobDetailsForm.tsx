import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import Button from "./Button";

const JobDetailsForm = () => {
  return (
    <div className="card bg-gray-500/10 rounded-xl flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          {/* Icon here... */}
          <IoDocumentTextOutline size={26} color="#3B82F6" />
          <h1 className="text-2xl font-bold">Job Details</h1>
        </div>
        <p className="text-slate-500">Tell us what you need help with</p>
      </div>

      {/* Form here... */}
      <form className="flex flex-col gap-4">
        {/* Job Title here... */}
        <div className="flex flex-col gap-1">
          <label htmlFor="jobTitle">Job Title</label>
          <input
            type="text"
            placeholder="e.g., Clean my garden, Math tutoring needed"
          />
        </div>

        {/* Category here... */}
        <div className="relative">
          <label htmlFor="category" className="">
            Select Service
          </label>
          <select
            id="category"
            name="category"
            defaultValue=""
            className="w-full appearance-none rounded-xl border border-gray-300 bg-white 
               text-gray-700 shadow-sm sm:text-base 
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="" disabled>
              Select a category
            </option>
            <option value="tutoring-teaching">Tutoring & Teaching</option>
            <option value="home-services">Home Services</option>
            <option value="delivery-transport">Delivery & Transport</option>
            <option value="handyman-repairs">Handyman & Repairs</option>
            <option value="beauty-wellness">Beauty & Wellness</option>
            <option value="creative-media">Creative & Media</option>
            <option value="events-hospitality">Events & Hospitality</option>
            <option value="tech-digital">Tech & Digital</option>
          </select>
          <svg
            className="absolute right-3 top-12 -translate-y-1/2 pointer-events-none w-4 h-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {/* Description here...*/}
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            placeholder="Describe what needs to be done, any specific requirements..."
            cols={40}
            rows={5}
          ></textarea>
        </div>

        {/* Location */}
        <div className="flex flex-col gap-1">
          <label htmlFor="location">Location</label>
          <input type="text" placeholder="Enter your location or area" />
        </div>

        {/* CTA here... */}
        <div className="flex justify-between items-center">
          <Button title="Back" variant="back" />
          <Button title="Next" variant="primary" />
        </div>
      </form>
    </div>
  );
};

export default JobDetailsForm;
