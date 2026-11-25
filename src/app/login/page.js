
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AuthNavbar from "@/components/AuthNavbar";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { apiUrl } from "@/lib/api";

function getSafeRedirectPath(path) {
  if (typeof path !== "string" || !path.startsWith("/") || path.startsWith("//")) {
    return "/my-learning";
  }
  return path;
}

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
  const formRef = useRef(null);

  const facebookExchangeStarted = useRef(false);

  const redirectAfterLogin = () => {
    const destination = sessionStorage.getItem("learnnest_post_login_redirect");
    sessionStorage.removeItem("learnnest_post_login_redirect");
    router.push(getSafeRedirectPath(destination));
  };

  useEffect(() => {
    const requestedPath = new URLSearchParams(window.location.search).get("next");
    if (requestedPath) {
      sessionStorage.setItem(
        "learnnest_post_login_redirect",
        getSafeRedirectPath(requestedPath)
      );
    }
  }, []);

  // Handle Facebook callback and exchange authorization code
  useEffect(() => {
    const clearLoginForm = () => {
      formRef.current?.reset();
      setFormData({ email: "", password: "" });
      setShowPassword(false);
    };

    window.addEventListener("pageshow", clearLoginForm);
    return () => window.removeEventListener("pageshow", clearLoginForm);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const authorizationCode = params.get("facebook_code");
    const facebookError = params.get("error");

    if (facebookError) {
      const errorMessages = {
        facebook: "Facebook login failed. Please try again.",
        facebook_email: "Facebook did not provide an email address.",
        account_exists:
          "An account with this email already exists. Please use your existing login method.",
      };

      setMessage(errorMessages[facebookError] || "Facebook login failed.");
      setMessageType("error");

      window.history.replaceState(
        {},
        document.title,
        window.location.pathname
      );

      return;
    }

    if (!authorizationCode || facebookExchangeStarted.current) {
      return;
    }

    facebookExchangeStarted.current = true;

    // Remove authorization code from URL
    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    );

    const exchangeCode = async () => {
      setMessage("");
      setLoading(true);

      try {
        const response = await fetch(
          apiUrl("/api/auth/facebook/exchange"),
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              code: authorizationCode,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Facebook login failed."
          );
        }

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        redirectAfterLogin();
      } catch (error) {
        setMessage(error.message || "Facebook login failed.");
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    };

    exchangeCode();
  }, [router]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Email and password login
  const handleLogin = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        apiUrl("/api/auth/login"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Login successful!");
      setMessageType("success");

      redirectAfterLogin();
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // Facebook login
  const handleFacebookLogin = () => {
    window.location.href =
      apiUrl("/api/auth/facebook");
  };

  // Google login
  const handleGoogleLogin = async (credentialResponse) => {
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch(
        apiUrl("/api/auth/google"),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            credential: credentialResponse.credential,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Google login failed."
        );
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setMessage("Google login successful!");
      setMessageType("success");

      redirectAfterLogin();
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

            {/* LEFT SECTION */}
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

            {/* RIGHT SECTION */}
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
                <form ref={formRef} className="mt-8 space-y-5" onSubmit={handleLogin} autoComplete="off">

                  {/* EMAIL */}
                  <div>
                    <label className="mb-2 block text-sm font-bold text-slate-700">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      autoComplete="off"
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
                        autoComplete="new-password"
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

                  {/* MESSAGE */}
                  {message && (
                    <p
                      className={`text-center text-sm font-medium ${messageType === "success"
                        ? "text-green-600"
                        : "text-red-600"
                        }`}
                    >
                      {message}
                    </p>
                  )}

                  {/* SIGN IN BUTTON */}
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
                  <GoogleSignInButton
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      setMessage("Google Login Failed");
                      setMessageType("error");
                    }}
                  />
                </div>

                {/* FACEBOOK LOGIN */}
                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    onClick={handleFacebookLogin}
                    disabled={loading}
                    className="relative flex h-[40px] w-[320px] items-center justify-center rounded-full border border-blue-200 bg-white px-5 text-sm font-bold text-blue-700 shadow-sm transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    <span className="absolute left-5 flex h-6 w-6 items-center justify-center rounded-full bg-[#1877F2] text-base font-bold text-white">
                      f
                    </span>

                    Continue with Facebook
                  </button>
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
