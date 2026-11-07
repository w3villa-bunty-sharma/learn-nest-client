"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthNavbar from "@/components/AuthNavbar";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save user information
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Login successful!");
      setMessageType("success");

      router.push("/my-learning");
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          credential: credentialResponse.credential,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Google login failed.");
      }

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save user information
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Google login successful!");
      setMessageType("success");

      router.push("/my-learning");
    } catch (error) {
      setMessage(error.message || "Google login failed.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AuthNavbar />

      <main className="min-h-screen bg-[#eef0ff] px-5 py-10 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-7xl">
          {/* SINGLE MAIN CONTAINER */}
          <div className="grid overflow-hidden rounded-[2rem] shadow-2xl shadow-indigo-200/50 lg:grid-cols-2">
            {/* LEFT DARK SECTION */}
            <section className="relative flex items-center overflow-hidden bg-gradient-to-br from-[#d5d9ff] via-[#dcd9ff] to-[#c9d0ff] p-8 sm:p-10 lg:p-12">
              {/* Background decoration */}
              <div className="pointer-events-none absolute -right-20 top-10 h-64 w-64 rounded-full bg-purple-400/20 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-blue-500/20 blur-2xl" />

              <div className="relative z-10 w-full">
                {/* BRAND */}
                <Link href="/" className="inline-flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-2xl text-white shadow-lg">
                    L
                  </div>

                  <div>
                    <h2 className="text-2xl font-extrabold tracking-tight text-blue-700">
                      LearnNest
                    </h2>
                    <p className="text-[10px] font-medium tracking-wide text-slate-600">
                      YOUR LEARNING PLATFORM
                    </p>
                  </div>
                </Link>

                {/* HEADING */}
                <div className="mt-10">
                  <span className="inline-flex rounded-full bg-white/60 px-4 py-2 text-xs font-bold text-blue-700">
                    ✨ Welcome Back to LearnNest
                  </span>

                  <h1 className="mt-6 text-4xl font-extrabold leading-[1.25] tracking-tight text-slate-900 sm:text-5xl">
                    Transform Your
                    <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text pb-1 text-transparent">
                      Learning
                    </span>
                    <span className="block bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text pb-1 text-transparent">
                      Journey
                    </span>
                  </h1>

                  <p className="mt-6 max-w-xl text-sm leading-7 text-slate-700 sm:text-base">
                    Continue your learning journey with LearnNest. Discover new
                    opportunities, improve your skills, and move closer to your
                    goals.
                  </p>
                </div>

                {/* FEATURE CARDS */}
                <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-xl border border-white/70 bg-white/65 p-3 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-xl">
                      🎙️
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">
                        Live Learning
                      </h3>
                      <p className="text-xs text-slate-600">
                        Learn at your own pace
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-white/70 bg-white/65 p-3 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-xl">
                      📝
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">
                        Smart Notes
                      </h3>
                      <p className="text-xs text-slate-600">
                        Organize your knowledge
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-white/70 bg-white/65 p-3 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-xl">
                      👥
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">
                        Interactive Learning
                      </h3>
                      <p className="text-xs text-slate-600">
                        Learn and grow together
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-xl border border-white/70 bg-white/65 p-3 shadow-sm">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pink-100 text-xl">
                      ⚡
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-800">
                        Skill Development
                      </h3>
                      <p className="text-xs text-slate-600">
                        Build skills for your future
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* RIGHT LIGHT SECTION */}
            <section className="flex items-center justify-center bg-[#f8f7ff] p-8 sm:p-10 lg:p-12">
              <div className="mx-auto w-full max-w-md">
                {/* FORM HEADER */}
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-2xl shadow-lg shadow-indigo-200">
                    🎓
                  </div>

                  <h2 className="mt-5 text-2xl font-extrabold text-slate-900">
                    Welcome Back!
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Sign in to continue your learning journey
                  </p>
                </div>

                {/* LOGIN FORM */}
                <form className="mt-8 space-y-5" onSubmit={handleLogin}>
                  {/* EMAIL */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-lg border border-indigo-100 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="block text-sm font-bold text-slate-700">
                        Password
                      </label>

                      <Link
                        href="/forgot-password"
                        className="text-xs font-semibold text-blue-600 transition hover:text-purple-600"
                      >
                        Forgot Password?
                      </Link>
                    </div>

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="Enter your password"
                        required
                        className="w-full rounded-lg border border-indigo-100 bg-white px-4 py-3 pr-16 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-blue-600"
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button>
                    </div>
                  </div>

                  {message && (
                    <p
                      className={`text-center text-sm font-medium ${
                        messageType === "success"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {message}
                    </p>
                  )}

                  {/* SUBMIT BUTTON */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? "Logging in..." : "Sign In"}
                  </button>
                </form>

                 {/* DIVIDER */}
                <div className="my-6 flex items-center gap-3">
                  <div className="h-px flex-1 bg-indigo-100" />
                  <span className="text-xs font-semibold text-slate-400">
                    OR CONTINUE WITH
                  </span>
                  <div className="h-px flex-1 bg-indigo-100" />
                </div>

                {/* GOOGLE LOGIN */}
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      setMessage("Google Login Failed");
                      setMessageType("error");
                    }}
                    theme="outline"
                    size="large"
                    shape="pill"
                    width="320"
                  />
                </div>

                {/* SIGNUP LINK */}
                <p className="mt-7 text-center text-sm text-slate-500">
                  Don't have an account?{" "}
                  <Link
                    href="/signup"
                    className="font-bold text-blue-600 transition hover:text-purple-600"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
