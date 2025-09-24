import React from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import { PaymentAndTimelineFormProps, StepProps } from "@/interfaces";
import Button from "./Button";
import { useForm } from "react-hook-form";
import { useJobPost } from "@/context/JobPostContext";

const PaymentAndTimelineForm: React.FC<StepProps> = ({
  pageTracker,
  onBack,
  onNext,
}) => {
  const { updateJobData } = useJobPost();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentAndTimelineFormProps>({
    defaultValues: {
      payRate: undefined,
      duration: "",
    },
  });

  const onSubmit = (data: PaymentAndTimelineFormProps) => {
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
            Payment & Timeline (Step {pageTracker})
          </h1>
        </div>
        <p className="text-slate-500">Set your budget and timeline</p>
      </div>

      {/* Form here... */}
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Pay Rate here... */}
        <div className="flex flex-col gap-1">
          <label htmlFor="payRate">Pay Rate</label>
          <input
            type="text"
            placeholder="150"
            {...register("payRate", {
              required: "Pay Rate is required",
            })}
          />
          <p className="text-center text-red-500">{errors.payRate?.message}</p>
        </div>

        {/* Expected Duration here...*/}
        <div className="flex flex-col gap-1">
          <label htmlFor="expectedDuration">Expected Duration</label>
          <input
            type="text"
            placeholder="e.g., 2 hours, 3 hours, half a day"
            {...register("duration", {
              required: "Duration is required",
            })}
          />
          <p className="text-center text-red-500">{errors.duration?.message}</p>
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

export default PaymentAndTimelineForm;
