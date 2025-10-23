import React, { useState } from "react";
import { RequirementsAndReviewFormProps, StepProps } from "@/interfaces";
import { IoDocumentTextOutline } from "react-icons/io5";
import Button from "./Button";
import JobPreview from "./JobPreview";
import { useForm } from "react-hook-form";
import { useJobPost } from "@/context/JobPostContext";

const RequirementsAndReviewForm: React.FC<StepProps> = ({
  pageTracker,
  onBack,
}) => {
  const { draftJob, postJob } = useJobPost();

  const { register, handleSubmit, reset } =
    useForm<RequirementsAndReviewFormProps>({
      defaultValues: {
        specialRequirements: "",
      },
    });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (data: RequirementsAndReviewFormProps) => {
    const finalData = { ...draftJob, ...data };

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await postJob(finalData);
      setSuccess("Job posted successfully!");
      reset();
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      setSuccess("");
      setError("");
    }, 3000);
  };

  return (
    <div className="card bg-gray-500/10 rounded-xl flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-1">
          {/* Icon here... */}
          <IoDocumentTextOutline size={26} color="#3B82F6" />
          <h1 className="text-xl font-bold">
            Requirements & Review (Step {pageTracker})
          </h1>
        </div>
        <p className="text-slate-500">Add any special requirements</p>
      </div>

      {/* Form here... */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Special Requirements here... */}
        <div className="flex flex-col gap-1">
          <label htmlFor="specialRequirements">
            Special Requirements (optional)
          </label>
          <textarea
            id="specialRequirements"
            placeholder="Any tools needed, experience level, specific instructions..."
            cols={40}
            rows={5}
            {...register("specialRequirements", { required: false })}
          ></textarea>
        </div>

        {/* Job Preview component here... */}
        {draftJob && (
          <JobPreview
            id={draftJob.id ?? 0}
            title={draftJob.title ?? ""}
            description={draftJob.description ?? ""}
            location={draftJob.location ?? ""}
            pay={draftJob.payRate ?? 0}
            duration={draftJob.duration ?? ""}
            // skills={(draftJob.skills ?? []).map((skill) => ({ skill: skill }))} // convert to { skill: string }[]
          />
        )}

        {/* CTA here... */}
        <div className="flex justify-between items-center">
          <Button title="Back" variant="back" onClick={onBack} />
          <Button
            type="submit"
            title={loading ? "Processing" : "Post Job"}
            variant="green"
          />
        </div>

        {/* Feedback Messages */}
        {error && (
          <p className="text-red-600 text-center font-semibold">{error}</p>
        )}
        {success && (
          <p className="text-green-600 text-center font-semibold">{success}</p>
        )}
      </form>
    </div>
  );
};

export default RequirementsAndReviewForm;
