import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import Button from "./Button";
import { JobDetailsFormProps, StepProps } from "@/interfaces";
import { useForm } from "react-hook-form";
import { useJobPost } from "@/context/JobPostContext";

const JobDetailsForm: React.FC<StepProps> = ({
  pageTracker,
  onNext,
  onBack,
}) => {
  const { updateJobData } = useJobPost();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JobDetailsFormProps>({
    defaultValues: {
      jobTitle: "",
      description: "",
      location: "",
    },
  });

  const onSubmit = async (data: JobDetailsFormProps) => {
    updateJobData(data);
    onNext();
  };

  return (
    <div className="card bg-gray-500/10 rounded-xl flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          {/* Icon here... */}
          <IoDocumentTextOutline size={26} color="#3B82F6" />
          <h1 className="text-xl font-bold">
            Job Details (Step {pageTracker})
          </h1>
        </div>
        <p className="text-slate-500">Tell us what you need help with</p>
      </div>

      {/* Form here... */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Job Title here... */}
        <div className="flex flex-col gap-1">
          <label htmlFor="jobTitle">Job Title</label>
          <input
            type="text"
            placeholder="e.g., Clean my garden, Math tutoring needed"
            {...register("jobTitle", {
              required: "Job Title is required",
            })}
          />
          <p className="text-center text-red-500">{errors.jobTitle?.message}</p>
        </div>

        {/* Description here...*/}
        <div className="flex flex-col gap-1">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Describe what needs to be done, any specific requirements..."
            cols={40}
            rows={5}
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
          <p className="text-center text-red-500">
            {errors.description?.message}
          </p>
        </div>

        {/* Location */}
        <div className="flex flex-col gap-1">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            placeholder="Enter your location or area"
            {...register("location", {
              required: "Location is required",
            })}
          />
          <p className="text-center text-red-500">{errors.location?.message}</p>
        </div>

        {/* CTA here... */}
        <div className="flex justify-between items-center">
          <Button title="Back" variant="back" onClick={onBack} />
          <Button type="submit" title="Next" variant="primary" />
        </div>
      </form>
    </div>
  );
};

export default JobDetailsForm;
