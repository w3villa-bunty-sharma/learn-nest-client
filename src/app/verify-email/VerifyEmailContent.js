"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Mail, MailCheck, RefreshCw } from "lucide-react";

const COUNTDOWN_SECONDS = 60;

export default function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const isVerified = searchParams.get("verified") === "true";
  const isExpired = searchParams.get("expired") === "true";

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [remainingSeconds, setRemainingSeconds] = useState(0);

  // Get email and countdown timestamp from sessionStorage
  useEffect(() => {
    const savedEmail = sessionStorage.getItem("signupEmail");
    const sentAt = Number(sessionStorage.getItem("signupEmailSentAt"));

    if (savedEmail) {
      setEmail(savedEmail);
    }

    if (sentAt) {
      const elapsedSeconds = Math.floor((Date.now() - sentAt) / 1000);

      setRemainingSeconds(Math.max(0, COUNTDOWN_SECONDS - elapsedSeconds));
    }
  }, []);

  // Countdown timer
  useEffect(() => {
    if (remainingSeconds <= 0) return;

    const timer = setInterval(() => {
      const sentAt = Number(sessionStorage.getItem("signupEmailSentAt"));

      if (!sentAt) {
        setRemainingSeconds(0);
        return;
      }

      const elapsedSeconds = Math.floor((Date.now() - sentAt) / 1000);

      setRemainingSeconds(Math.max(0, COUNTDOWN_SECONDS - elapsedSeconds));
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingSeconds]);

  // Resend verification email
  const handleResendEmail = async () => {
    if (!email) {
      setError("Email address not found. Please sign up again.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setError("");

      const response = await fetch(
        "http://localhost:5000/api/auth/resend-verification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to resend verification email");
      }

      // Save new email sending timestamp
      const currentTime = Date.now();

      sessionStorage.setItem("signupEmailSentAt", currentTime.toString());

      setRemainingSeconds(COUNTDOWN_SECONDS);

      setMessage(
        "Verification email sent successfully. Please check your inbox.",
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Convert seconds into MM:SS
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds,
  ).padStart(2, "0")}`;

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#eef0ff] via-white to-[#f3edff] px-4 py-12">
      <div className="w-full max-w-md rounded-2xl border border-indigo-100 bg-white p-8 text-center shadow-xl shadow-indigo-100/50">
        {/* Email Icon */}
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-indigo-50">
          {isVerified ? (
            <MailCheck size={42} className="text-green-600" />
          ) : (
            <Mail size={42} className="text-indigo-600" />
          )}
        </div>

        {isVerified ? (
          <>
            {/* Verified Email Section */}
            <h1 className="mb-3 text-2xl font-bold text-slate-800">
              Email Verified Successfully!
            </h1>

            <p className="mb-7 text-sm leading-7 text-slate-600">
              Your email address has been verified successfully. You can now log
              in to your account.
            </p>

            <Link
              href="/login"
              className="inline-flex rounded-lg bg-indigo-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Go to Login
            </Link>
          </>
        ) : isExpired ? (
          <>
            <h1 className="mb-3 text-2xl font-bold text-red-600">
              Your Verification Link Has Expired
            </h1>

            <p className="mb-6 text-sm leading-7 text-slate-600">
              Your verification link is no longer valid. Please request a new
              verification link to verify your email address.
            </p>

          </>
        ) : (
          <>
            {/* Verify Email Section */}
            <h1 className="mb-3 text-2xl font-bold text-slate-800">
              Verify Your Email
            </h1>

            <p className="mb-6 text-sm leading-7 text-slate-600">
              Your account has been created successfully! We have sent a
              verification link to your email address. Please check your inbox
              and verify your email before logging in.
            </p>

            {/* Expiry Message */}
            <div className="mb-6 rounded-lg bg-indigo-50 px-4 py-3">
              <p className="text-xs font-medium text-indigo-700">
                Your verification link will expire in 1 minute.
              </p>
            </div>

            {/* Gmail Button */}
            <a
              href="https://mail.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mb-5 inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              <Mail size={18} />
              Open Gmail Inbox
            </a>

            {/* Resend Section */}
            <p className="mb-3 text-sm text-slate-500">
              Didn't receive the email?
            </p>

            {/* Countdown */}
            {remainingSeconds > 0 && (
              <p className="mb-3 text-sm font-medium text-indigo-600">
                Resend link available in {formattedTime}
              </p>
            )}

            {/* Resend Button */}
            <button
              onClick={handleResendEmail}
              disabled={loading || remainingSeconds > 0}
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-indigo-600 px-6 py-3 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RefreshCw size={17} className={loading ? "animate-spin" : ""} />

              {loading ? "Sending..." : "Resend Verification Email"}
            </button>

            {/* Success Message */}
            {message && (
              <p className="mt-4 text-sm text-green-600">{message}</p>
            )}

            {/* Error Message */}
            {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          </>
        )}
      </div>
    </main>
  );
}
