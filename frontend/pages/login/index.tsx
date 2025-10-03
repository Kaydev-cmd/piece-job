import { useState } from "react";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { LoginProps } from "@/interfaces";
import axios from "axios";
import Button from "@/components/common/Button";
import { useRouter } from "next/router";

const Login: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginProps>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginProps) => {
    setLoading(true);
    setResolved(null);
    setError(null);
    try {
      const response = await axios.post("/api/login/login", data);
      if (response.data.success) {
        setResolved("Login successful! Redirecting...");

        // Redirect based on email or role
        setTimeout(() => {
          if (response.data.user.role === "jobSeeker") {
            router.push("/job-feed");
          } else if (response.data.user.role === "employer") {
            router.push("/wallet");
          } else {
            router.push("/");
          }
          reset();
        }, 1500);
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }

    setTimeout(() => {
      setResolved(null);
      setError(null);
    }, 3000);
  };
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div
        className="w-full h-full max-w-md"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {/* Logo/Brand */}
        <div className="text-center mb-8" style={{ marginBottom: "32px" }}>
          <Link href="/" className="inline-block">
            <h1 className="text-5xl font-bold bg-[linear-gradient(135deg,#1D4ED8,#10B981)] bg-clip-text text-transparent">
              PieceJob
            </h1>
            <p className="text-[#6B7280] text-sm mt-1">
              Where skills meet opportunity
            </p>
          </Link>
        </div>

        <div
          className="rounded-lg h-full flex flex-col items-center justify-around p-8  bg-[#FFFFFF] text-[#F9FAFB] shadow-sm shadow-medium border-0"
          style={{ padding: "24px", marginBottom: "16px" }}
        >
          <div
            className="flex flex-col mb-8  gap-2 p-6 space-y-1 text-center"
            style={{ marginBottom: "16px", padding: "10px" }}
          >
            <div className=" leading-none tracking-tight text-2xl font-bold text-[#111827]">
              Welcome back
            </div>
            <div className="text-sm text-[#6B7280]">
              Sign in to your account to continue earning
            </div>
          </div>
          {/* form  */}
          <form
            className=" flex flex-col gap-2 items-center  space-y-4"
            onSubmit={handleSubmit(onSubmit)}
            style={{ marginBottom: "16px", width: "100%" }}
          >
            <div className=" flex flex-col gap-1 w-full  space-y-2">
              <label htmlFor="email" style={{ color: "#6B7280" }}>
                Email or Phone:
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
                type="email"
                placeholder="Enter your email or phone number"
                className="h-12 w-full"
              />
              <p className="text-center text-red-500">
                {errors.email?.message}
              </p>
            </div>
            <div
              className=" flex flex-col gap-1 w-full  space-y-2"
              style={{ color: "#6B7280" }}
            >
              <label htmlFor="password">Password:</label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                })}
                type="password"
                placeholder="Enter your password"
                className="h-12"
              />
              <p className="text-center text-red-500">
                {errors.password?.message}
              </p>
            </div>

            <div className="flex items-center justify-between text-sm">
              <Link
                href="#"
                className="text-[#6B7280] hover:text-[#1D4ED8] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              title={loading ? "Signing In..." : "Sign In"}
              variant="subscribe"
              type="submit"
              className="w-full h-12"
              disabled={loading}
            />

            <div className="relative mt-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-[#E5E7EB]" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#F9FAFB] px-2 text-[#6B7280]">
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              title="Continue with Google"
              variant="google"
              className="text-black"
              type="button"
            />

            {/* Feedback Messages */}
            {resolved && (
              <p className="text-center text-green-600 font-semibold">
                {resolved}
              </p>
            )}
            {error && (
              <p className="text-center text-red-600 font-semibold">{error}</p>
            )}
          </form>
        </div>

        <div
          className="text-center mt-6"
          style={{ marginBottom: "24px", marginTop: "24px" }}
        >
          <p className="text-[#6B7280] text-sm">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-primary hover:text-[#3B82F6] transition-colors font-medium"
            >
              Sign up here
            </Link>
          </p>
        </div>

        {/* Quick Login Options for PieceJob */}
        <div
          className="mt-8 p-4 bg-[#10B981]/10 rounded-lg border border-[#10B981]/20"
          style={{ padding: "16px", marginTop: "2px" }}
        >
          <h3
            className="font-semibold text-[#111827] mb-2 text-center"
            style={{ marginBottom: "8px" }}
          >
            New to PieceJob?
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              title="I'm a Job Seeker"
              variant="subscribe"
              onClick={() => (window.location.href = "/signup")}
              className="text-xs"
            />

            <Button
              title="I'm an Employer"
              onClick={() => (window.location.href = "/signup")}
              variant="subscribe"
              className="text-xs"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
