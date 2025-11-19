import React, { useState } from "react";
import Link from "next/link";
import Button from "@/components/common/Button";
import { useForm } from "react-hook-form";
import { SignupFormValues } from "@/interfaces";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignupFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
    },
  });
  const router = useRouter();
  const { loggedInToken, baseUrl, loggedUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const onSubmit = async (data: SignupFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    console.log("data: ", data);
    try {
      const simple =
        loggedUser.role === "employer" ? "/newprofile" : "/seeker/newprofile";
      const res = await axios.post(baseUrl + simple, data, {
        headers: {
          Authorization: "Bearer " + loggedInToken,
        },
      });

      console.log("response: ", res);
      setSuccess("Profile created successfully!");

      // If role is job seeker, redirect to job feed
      if (loggedUser.role === "jobSeeker") {
        router.push("/job-feed");
      } else {
        router.push("/job-poster-feed");
      }

      reset();
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }

    if (success || error) {
      setTimeout(() => {
        setSuccess(null);
        setError(null);
      }, 3000);
    }
  };

  return (
    <section
      className="container"
      style={{ paddingTop: "0", paddingBottom: "0" }}
    >
      <h1
        className="text-6xl text-center font-semibold bg-[linear-gradient(135deg,#1D4ED8,#10B981)] bg-clip-text text-transparent lg:text-7xl"
        style={{ margin: "16px 0" }}
      >
        PieceJob
      </h1>
      <p className="text-center text-slate-500 font-semibold">
        Where skills meet opportunity
      </p>

      {/* Should serve as a background */}
      <div className="flex justify-center">
        <div
          className="bg-white rounded-xl shadow-md w-full lg:max-w-4xl"
          style={{ marginTop: "16px", padding: "32px" }}
        >
          <div className="flex flex-col gap-2">
            <h2 className="text-4xl font-bold text-center">
              Create your account
            </h2>
            <p className="text-center text-slate-500 font-semibold">
              Join PieceJob and start earning today
            </p>

            {/* Form here... */}
            <form
              className="flex flex-col gap-4"
              style={{ marginTop: "16px" }}
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* First and Last names */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="firstName" className="font-semibold">
                    First Name:
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />
                  <p className="text-center text-red-500">
                    {errors.firstName?.message}
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="lastName" className="font-semibold">
                    Last Name:
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                  />
                  <p className="text-center text-red-500">
                    {errors.lastName?.message}
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1">
                <label htmlFor="email" className="font-semibold">
                  Email:
                </label>
                <input
                  type="email"
                  placeholder="john@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Enter a valid email",
                    },
                  })}
                />
                <p className="text-center text-red-500">
                  {errors.email?.message}
                </p>
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-1">
                <label htmlFor="phoneNumber" className="font-semibold">
                  Phone Number:
                </label>
                <input
                  type="text"
                  placeholder="+27 XX XXX XXXX"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    // pattern: {
                    //   value: /^(?:\+27|0)\d{9}$/,
                    //   message: "Enter a valid phone number",
                    // },
                  })}
                />
                <p className="text-center text-red-500">
                  {errors.phoneNumber?.message}
                </p>
              </div>

              {/* Business Employer Extra Fields */}
              {loggedUser.role === "employer" &&
                loggedUser.employerType === "business" && (
                  <div className="flex flex-col gap-4 mt-4">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="companyName" className="font-semibold">
                        Company Name:
                      </label>
                      <input
                        type="text"
                        placeholder="ABC Ltd"
                        {...register("companyName", {
                          required: "Company name is required",
                        })}
                      />
                      <p className="text-center text-red-500">
                        {errors.companyName?.message}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label
                        htmlFor="companyRegistration"
                        className="font-semibold"
                      >
                        Company Registration Number:
                      </label>
                      <input
                        type="text"
                        placeholder="2025/123456/07"
                        {...register("companyRegistration", {
                          required: "Company registration number is required",
                          pattern: {
                            value: /^\d{4}\/\d{6}\/\d{2}$/,
                            message:
                              "Enter a valid company registration number",
                          },
                        })}
                      />
                      <p className="text-center text-red-500">
                        {errors.companyRegistration?.message}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <label htmlFor="companyAddress" className="font-semibold">
                        Company Address:
                      </label>
                      <input
                        type="text"
                        placeholder="123 Main Street, Johannesburg"
                        {...register("companyAddress", {
                          required: "Company address is required",
                        })}
                      />
                      <p className="text-center text-red-500">
                        {errors.companyAddress?.message}
                      </p>
                    </div>
                  </div>
                )}
              <div
                className="flex flex-col items-center gap-4"
                style={{ marginTop: "16px" }}
              >
                <Button
                  title={loading ? "Creating user" : "Create User"}
                  type="submit"
                  variant="subscribe"
                  disabled={loading}
                />
                <span className="text-slate-500 text-sm">or</span>
                <Button
                  title="Continue with Google"
                  variant="google"
                  type="button"
                />
              </div>

              {/* Feedback Messages */}
              {error && (
                <p className="text-red-600 text-center font-semibold">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-green-600 text-center font-semibold">
                  {success}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      <p className="text-center" style={{ marginTop: "16px" }}>
        Already have an account?{" "}
        <Link href="/login" className="text-blue-700">
          Login here
        </Link>
      </p>
    </section>
  );
};

export default Register;
