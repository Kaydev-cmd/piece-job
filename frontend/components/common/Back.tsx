import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from "next/router";

const Back = () => {
  const router = useRouter();

  return (
    <button
      className="flex items-center gap-2 text-blue-500"
      style={{ padding: "0" }}
      onClick={() => router.back()}
    >
      {/* Icon here... */}
      <FaArrowLeft size={12} />
      Back
    </button>
  );
};

export default Back;
