import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { LoggedInUser, LoginProps } from "@/interfaces";
import axios from "axios";
import Button from "@/components/common/Button";
import { useRouter } from "next/router";
import { useAuth } from "@/context/AuthContext";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const {login, baseUrl,setLoggedInUser} = useAuth() ;
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const url = baseUrl+"/login"
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginProps>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginProps) => {
    setLoading(true);
    setResolved(null);
    setError(null);
    console.log("data: ",data)
    try {
      // const response = await axios.post("/api/login/login", data);
      const response = await axios.post(url, data);
      const resApi = response.data
      if (resApi.data) {
        setResolved("Login successful! Redirecting...");
        login(resApi.data.loggedInToken);
        const loggedUser : LoggedInUser = {
          role : resApi.data.role,
          username : resApi.data.username,
          employerType: resApi.data.employerType
        }
        console.log("api res: ",response.data, "logged in",loggedUser)
        setLoggedInUser(loggedUser);
        
        // axios.defaults.headers.common['Authorization'] = `Bearer ${resApi.data.loggedInToken}`
        // Redirect based on email or role
        setTimeout(() => {
          if (loggedUser.role === "jobSeeker") {
            router.push("/job-feed");
          } else if (loggedUser.role === "employer") {
            router.push("/job-poster-feed");
          } else {
            router.push("/");
          }
          reset();
        }, 1500);
      } else {
      console.log("err res: ",resApi)
        setError("Invalid credentials. Please try again.");
      }
    } catch (err: unknown) {
        console.log("caught err: ",err)

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
    <section
      className="container min-h-screen flex items-center justify-center"
      style={{ paddingTop: "0", paddingBottom: "0" }}
    >
      <div
        className="w-full h-full max-w-md"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        {/* Logo/Brand */}
        <div className="text-center" style={{ margin: "32px 0" }}>
          <Link href="/" className="inline-block">
            <h1 className="text-6xl text-center font-semibold bg-[linear-gradient(135deg,#1D4ED8,#10B981)] bg-clip-text text-transparent lg:text-7xl">
              PieceJob
            </h1>
            <p className="text-center text-slate-500 font-semibold">
              Where skills meet opportunity
            </p>
          </Link>
        </div>

        <div
          className="bg-white rounded-xl shadow-md w-full lg:max-w-4xl"
          style={{ padding: "24px", marginBottom: "16px" }}
        >
          <div
            className="flex flex-col gap-2 text-center"
            style={{ marginBottom: "16px", padding: "10px" }}
          >
            <h2 className="text-4xl font-bold text-center">Welcome back</h2>
            <p className="text-center text-slate-500 font-semibold">
              Sign in to your account to continue earning
            </p>
          </div>

          {/* form  */}
          <form
            className="flex flex-col gap-4 items-center"
            onSubmit={handleSubmit(onSubmit)}
            style={{ marginBottom: "16px", width: "100%" }}
          >
            <div className=" flex flex-col gap-1 w-full">
              <label htmlFor="email" style={{ color: "#6B7280" }}>
                Email or Phone:
              </label>
              <input
                {...register("username", {
                  required: "Username or Email is required",
                  // pattern: {
                  //   value: /^\S+@\S+$/i,
                  //   message: "Enter a valid email",
                  // },
                })}
                type="text"
                placeholder="Enter your email or phone number"
                className="h-12 w-full"
              />
              <p className="text-center text-red-500">
                {errors.username?.message}
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
                  // minLength: {
                  //   value: 6,
                  //   message: "Password must be at least 6 characters long",
                  // },
                })}
                type="password"
                placeholder="Enter your password"
                className="h-12"
              />
              <p className="text-center text-red-500">
                {errors.password?.message}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <Link
                href="#"
                className="text-[#6B7280] hover:text-[#1D4ED8] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <div className="flex flex-col gap-6">
              <Button
                title={loading ? "Signing In..." : "Sign In"}
                variant="subscribe"
                type="submit"
                disabled={loading}
              />

              <div className="relative">
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
            </div>
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
          className="text-center"
          style={{ marginBottom: "24px", marginTop: "24px" }}
        >
          <p className="text-[#6B7280]">
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
          className="bg-[#10B981]/10 rounded-lg border border-[#10B981]/20"
          style={{ padding: "24px" }}
        >
          <h3
            className="font-semibold text-[#111827] text-center"
            style={{ marginBottom: "16px" }}
          >
            New to PieceJob?
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              title="I'm a Job Seeker"
              variant="subscribe"
              onClick={() => router.push("/signup")}
              className="text-xs"
            />

            <Button
              title="I'm an Employer"
              onClick={() => router.push("/signup")}
              variant="subscribe"
              className="text-xs"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
