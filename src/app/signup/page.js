"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthNavbar from "@/components/AuthNavbar";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log("Signup function called!");
    console.log("Form Data:", formData);

    setMessage("");

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      console.log("Signup Response:", data);

      if (!response.ok) {
        throw new Error(data.message || "Signup failed.");
      }

      setMessage(data.message);
      setMessageType("success");

      // Save email and email sending time
      sessionStorage.setItem(
        "signupEmail",
        formData.email.trim().toLowerCase(),
      );
      sessionStorage.setItem("signupEmailSentAt", Date.now().toString());

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      router.push("/verify-email");
      
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
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
                    ✨ Start Your Learning Journey
                  </span>

                  <h1 className="mt-6 text-4xl font-extrabold leading-[1.25] tracking-tight text-slate-900 sm:text-5xl">
                    Create Your
                    <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text pb-1 text-transparent">
                      Account
                    </span>
                    <span className="block bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text pb-1 text-transparent">
                      Today
                    </span>
                  </h1>

                  <p className="mt-6 max-w-xl text-sm leading-7 text-slate-700 sm:text-base">
                    Join LearnNest and explore exciting courses, develop
                    valuable skills, and take your first step towards a brighter
                    future.
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
                    Create Account
                  </h2>

                  <p className="mt-2 text-sm text-slate-500">
                    Join LearnNest and start learning today
                  </p>
                </div>

                {/* SIGNUP FORM */}
                <form className="mt-8 space-y-4" onSubmit={handleSignup}>
                  {/* FULL NAME */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      className="w-full rounded-lg border border-indigo-100 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      required
                      className="w-full rounded-lg border border-indigo-100 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                    />
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Password
                    </label>

                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Create a password"
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

                  {/* CONFIRM PASSWORD */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Confirm Password
                    </label>

                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                        className="w-full rounded-lg border border-indigo-100 bg-white px-4 py-3 pr-16 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-blue-600"
                      >
                        {showConfirmPassword ? "Hide" : "Show"}
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
                    className="w-full rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    Create Account
                  </button>
                </form>

                {/* LOGIN LINK */}
                <p className="mt-6 text-center text-sm text-slate-500">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-bold text-blue-600 transition hover:text-purple-600"
                  >
                    Login
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
