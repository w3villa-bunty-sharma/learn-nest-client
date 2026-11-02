
"use client";

import { useState } from "react";
import Link from "next/link";
import AuthNavbar from "@/components/AuthNavbar";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Password reset requested for:", email);
  };

  return (
    <>
      <AuthNavbar />

      <main className="flex min-h-screen items-center justify-center bg-[#f8f7ff] px-4 py-12">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg sm:p-10">

          <div className="mb-8 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-2xl font-bold text-white">
              L
            </div>

            <h1 className="text-3xl font-bold text-gray-900">
              Forgot Password?
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500">
              Enter your registered email address and we'll
              send you a link to reset your password.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Send Reset Link
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="text-sm font-semibold text-indigo-600 hover:text-indigo-700"
            >
              ← Back to Login
            </Link>
          </div>

        </div>
      </main>
    </>
  );
}
