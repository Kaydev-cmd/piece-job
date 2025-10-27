import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import Button from "./Button";
import { JobDetailsFormProps, StepProps } from "@/interfaces";
import { useFieldArray, useForm } from "react-hook-form";
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
    control,
    formState: { errors },
  } = useForm<JobDetailsFormProps>({
    defaultValues: {
      title: "",
      description: "",
      location: "",
      skills: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "skills",
  });

  const onSubmit = async (data: JobDetailsFormProps) => {
    const normalizedData = {
      ...data,
      skills: data.skills.map((skill) =>
        typeof skill === "string" ? { skillName: skill } : skill
      ),
    };

    updateJobData(normalizedData);
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
            {...register("title", {
              required: "Job Title is required",
            })}
          />
          <p className="text-center text-red-500">{errors.title?.message}</p>
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

        {/* Skills (Dynamic Field Array) */}
        <div className="flex flex-col gap-2">
          <label>Skills</label>
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
            <input
              type="text"
              placeholder="Enter a skill"
              id="newSkill"
              className="lg:flex-1"
            />
            <Button
              type="button"
              title="Add Skill"
              variant="green"
              onClick={() => {
                const input = document.getElementById(
                  "newSkill"
                ) as HTMLInputElement;
                if (input && input.value.trim() !== "") {
                  append({ skillName: input.value.trim() });
                  input.value = "";
                }
              }}
            />
          </div>
        </div>

        {/* Render skills as pills */}
        <div className="flex flex-wrap gap-2 mt-2">
          {fields.map((field, index) => (
            <span
              key={field.id}
              className=" bg-blue-500 text-white rounded-full flex items-center gap-1"
              style={{ padding: "8px" }}
            >
              {field.skillName}
              <button
                type="button"
                className="ml-1 text-sm"
                onClick={() => remove(index)}
                style={{ padding: "0" }}
              >
                ✕
              </button>
            </span>
          ))}
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
