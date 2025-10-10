import React from "react";
import { EditJobModalProps } from "@/interfaces";
import { useForm } from "react-hook-form";
import Button from "./Button";

const EditJobModal: React.FC<EditJobModalProps> = ({
  job,
  onClose,
  onSave,
}) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: job,
  });

  const submitHandler = (data: unknown) => {
    onSave(data);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-white/50 backdrop-blur-sm overflow-y-auto">
      <div style={{ padding: "16px" }}>
        <h2 className="text-2xl font-bold" style={{ margin: "16px 0px" }}>
          Edit Job
        </h2>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-4"
        >
          {/* Job Title */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Job Title</label>
            <input type="text" {...register("jobTitle")} />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Description</label>
            <textarea rows={4} {...register("description")} />
          </div>

          {/* Location */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Location</label>
            <input type="text" {...register("location")} />
          </div>

          {/* Pay Rate*/}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Pay Rate</label>
            <input type="number" {...register("payRate")} />
          </div>

          {/* Duration */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Duration</label>
            <input type="text" {...register("duration")} />
          </div>

          {/* Skills (comma separated for simplicity) */}
          <div className="flex flex-col gap-1">
            <label className="font-semibold">Skills</label>
            <input
              type="text"
              {...register("skills")}
              placeholder="e.g. React, Tailwind"
            />
          </div>

          <div className="flex flex-col gap-2" style={{ marginTop: "16px" }}>
            <Button type="submit" title="Save Changes" variant="green" />
            <Button
              type="button"
              title="Cancel"
              variant="cancel"
              onClick={onClose}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditJobModal;
