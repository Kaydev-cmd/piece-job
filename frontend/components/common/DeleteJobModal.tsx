import React from "react";
import { DeleteJobModalProps } from "@/interfaces";
import Button from "./Button";

const DeleteJobModal: React.FC<DeleteJobModalProps> = ({
  onClose,
  onConfirm,
  jobTitle,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div
        className="flex flex-col gap-4 bg-white rounded-xl shadow-lg w-full max-w-sm lg:max-w-md"
        style={{ padding: "24px" }}
      >
        <h2 className="text-2xl font-bold">Delete Job</h2>
        <p>
          Are you sure you want to delete <strong>{jobTitle}</strong>? This
          action cannot be undone.
        </p>

        <div className="flex justify-center gap-4">
          <Button title="Cancel" variant="cancel" onClick={onClose} />
          <Button title="Delete" variant="subscribe" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
};

export default DeleteJobModal;
