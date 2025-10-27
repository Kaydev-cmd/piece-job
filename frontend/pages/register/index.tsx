import React, { useState } from "react";
import Link from "next/link";
import Button from "@/components/common/Button";
import { useForm } from "react-hook-form";
import { RegisterFormValues } from "@/interfaces";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    defaultValues: {
      userName: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { baseUrl, loggedInToken } = useAuth();

  const onSubmit = async (data: RegisterFormValues) => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    console.log("data:", data);
    try {
      const response = await axios.post(`${baseUrl}/register`, data, {
        headers: { Authorization: `Bearer ${loggedInToken}` },
      });
      console.log(response);

      setSuccess("User created successfully!");

      setTimeout(() => {
        window.location.href = "/signup";
      }, 2000);

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
                  <label htmlFor="userName" className="font-semibold">
                    User Name:
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    {...register("userName", {
                      required: "User Name is required",
                    })}
                  />
                  <p className="text-center text-red-500">
                    {errors.userName?.message}
                  </p>
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="font-semibold">
                  Password:
                </label>
                <input
                  type="password"
                  placeholder="Create a strong password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <p className="text-center text-red-500">
                  {errors.password?.message}
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="confirmPassword" className="font-semibold">
                  Confirm Password:
                </label>
                <input
                  type="password"
                  placeholder="Re-enter your password"
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
                <p className="text-center text-red-500">
                  {errors.confirmPassword?.message}
                </p>
              </div>
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
