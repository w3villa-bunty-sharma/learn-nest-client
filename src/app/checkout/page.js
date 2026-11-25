"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  Clock3,
  GraduationCap,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { courses } from "@/data/courses";
import ConditionalNavbar from "@/components/ConditionalNavbar";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

function loadRazorpayScript() {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () =>
      reject(new Error("Unable to load Razorpay Checkout."));
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white px-5 py-16">
          <div className="mx-auto max-w-6xl animate-pulse">
            <div className="h-4 w-32 rounded bg-slate-200" />
            <div className="mt-8 h-10 w-72 rounded bg-slate-200" />
            <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_360px]">
              <div className="h-96 rounded-3xl bg-slate-200" />
              <div className="h-80 rounded-3xl bg-slate-200" />
            </div>
          </div>
        </main>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}

function CheckoutContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const courseSlug = searchParams.get("course");

  const [isLoading, setIsLoading] = useState(false);
  const [paymentMessage, setPaymentMessage] = useState("");

  if (!courseSlug) {
    return (
      <CheckoutEmptyState
        title="Choose a course first"
        message="Select a course to review its details and continue to checkout."
      />
    );
  }

  const course = courses.find((item) => item.slug === courseSlug);

  if (!course) {
    return (
      <CheckoutEmptyState
        title="We couldn't find that course"
        message="Choose a course from the catalog to start checkout."
      />
    );
  }

  const price = Number(course.price);
  const formattedPrice = `₹${price.toLocaleString("en-IN")}`;

  async function handleContinueToPayment() {
    const token = localStorage.getItem("token");

    if (!token) {
      const checkoutPath = `/checkout?course=${encodeURIComponent(courseSlug)}`;
      router.push(`/login?next=${encodeURIComponent(checkoutPath)}`);
      return;
    }

    try {
      setIsLoading(true);
      setPaymentMessage("");

      await loadRazorpayScript();

      const orderResponse = await fetch(`${API_URL}/api/payment/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ courseSlug }),
      });

      const orderResult = await orderResponse.json();

      if (!orderResponse.ok || orderResult.success === false) {
        throw new Error("Unable to create the payment order. Please try again.");
      }

      const responseData = orderResult.data || orderResult;
      const order = responseData.order || responseData;

      const keyId =
        order.keyId ||
        responseData.keyId ||
        responseData.key_id ||
        responseData.razorpayKeyId ||
        responseData.publicKeyId;
        
      const razorpayOrderId =
        order.id || order.razorpay_order_id || responseData.orderId;

      if (!keyId || !razorpayOrderId || !order.amount) {
        throw new Error(
          "The order response is missing the Razorpay key, order ID, or amount."
        );
      }

      const options = {
        key: keyId,
        amount: order.amount,
        currency: order.currency || "INR",
        name: "LearnNest",
        description: course.title,
        order_id: razorpayOrderId,

        handler: async function (paymentResponse) {
          try {
            setIsLoading(true);
            setPaymentMessage("Verifying payment...");

            const verifyResponse = await fetch(
              `${API_URL}/api/payment/verify`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                  razorpay_order_id: paymentResponse.razorpay_order_id,
                  razorpay_payment_id: paymentResponse.razorpay_payment_id,
                  razorpay_signature: paymentResponse.razorpay_signature,
                }),
              }
            );

            const verifyResult = await verifyResponse.json();

            if (
              !verifyResponse.ok ||
              verifyResult.success === false ||
              verifyResult.enrolled === false
            ) {
              throw new Error("Payment verification failed. Please contact support.");
            }

            router.replace(
              `/payment-success?course=${encodeURIComponent(courseSlug)}`
            );
          } catch {
            setPaymentMessage("Unable to verify the payment. Please contact support.");
          } finally {
            setIsLoading(false);
          }
        },

        modal: {
          ondismiss: function () {
            setIsLoading(false);
            setPaymentMessage("The payment window was closed.");
          },
        },

        theme: {
          color: "#6d28d9",
        },
      };

      const razorpayCheckout = new window.Razorpay(options);

      razorpayCheckout.on("payment.failed", function () {
        setIsLoading(false);
        setPaymentMessage("Payment failed. Please try again.");
      });

      razorpayCheckout.open();
      setIsLoading(false);
    }  catch (error) {
      console.error("Checkout payment error:", error);
      setIsLoading(false);
      setPaymentMessage(
        error?.message || "Unable to start the payment. Please try again."
      );
    }
  }
  return (
    <>
      <ConditionalNavbar />

      <main className="min-h-screen bg-white text-slate-900">
        <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-12">
          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-violet-700"
          >
            <ArrowLeft size={16} /> Back to course
          </Link>

          <div className="mt-7 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-violet-700 shadow-sm">
                <Sparkles size={13} /> Course checkout
              </span>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                Review your course
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                Take a final look at your selection before continuing.
              </p>
            </div>

            <ol className="flex w-full max-w-md items-center gap-2 rounded-2xl border border-white bg-white/75 p-3 shadow-sm sm:gap-3 lg:w-auto">
              <CheckoutStep number="01" label="Review" active />
              <div className="h-px flex-1 bg-violet-100" />
              <CheckoutStep number="02" label="Payment" />
              <div className="h-px flex-1 bg-violet-100" />
              <CheckoutStep number="03" label="Access" />
            </ol>
          </div>

          <div className="mt-9 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_370px] lg:gap-8">
            <section className="overflow-hidden rounded-3xl border border-white bg-white shadow-xl shadow-violet-100/70">
              <div className="relative h-56 overflow-hidden bg-gradient-to-br from-violet-200 via-indigo-200 to-blue-200 sm:h-72 lg:h-80">
                {course.image && (
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/5 to-transparent" />

                <span className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/90 px-3.5 py-1.5 text-xs font-bold text-violet-800 shadow-sm backdrop-blur sm:left-7 sm:top-7">
                  <Sparkles size={14} /> {course.category}
                </span>

                <div className="absolute inset-x-5 bottom-5 text-white sm:inset-x-7 sm:bottom-7">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">
                    Your next learning goal
                  </p>
                  <h2 className="mt-2 max-w-3xl text-2xl font-extrabold leading-tight sm:text-3xl lg:text-4xl">
                    {course.title}
                  </h2>
                </div>
              </div>

              <div className="p-5 sm:p-7 lg:p-8">
                <div className="flex flex-wrap gap-2.5">
                  {course.duration && (
                    <DetailPill
                      icon={<Clock3 size={15} />}
                      label={course.duration}
                    />
                  )}

                  {course.level && (
                    <DetailPill
                      icon={<BarChart3 size={15} />}
                      label={course.level}
                    />
                  )}

                  <DetailPill
                    icon={<GraduationCap size={16} />}
                    label="Self-paced learning"
                  />
                </div>

                <div className="mt-7 border-t border-slate-100 pt-6">
                  <h3 className="text-base font-bold text-slate-900">
                    About this course
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-7 text-slate-600">
                    {course.description}
                  </p>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <IncludedItem>Learn at your own pace</IncludedItem>
                  <IncludedItem>Course materials in one place</IncludedItem>
                </div>
              </div>
            </section>

            <aside className="overflow-hidden rounded-3xl border border-white bg-white shadow-xl shadow-violet-100/70 lg:sticky lg:top-24">
              <div className="bg-gradient-to-r from-violet-700 via-indigo-700 to-blue-700 px-6 py-5 text-white">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-100">
                  Order summary
                </p>
                <p className="mt-1 text-sm text-white/80">
                  One course, ready when you are.
                </p>
              </div>

              <div className="p-6">
                <div className="flex gap-4">
                  <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-violet-100">
                    {course.image && (
                      <Image
                        src={course.image}
                        alt=""
                        fill
                        sizes="96px"
                        className="object-cover"
                      />
                    )}
                  </div>

                  <div className="min-w-0 py-1">
                    <p className="line-clamp-2 text-sm font-bold leading-5 text-slate-900">
                      {course.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {course.category}
                    </p>
                  </div>
                </div>

                <div className="mt-6 border-t border-dashed border-slate-200 pt-5 text-sm">
                  <div className="flex justify-between gap-4 text-slate-600">
                    <span>Course price</span>
                    <span>{formattedPrice}</span>
                  </div>
                </div>

                <div className="mt-5 flex items-end justify-between border-t border-slate-100 pt-5">
                  <p className="text-sm font-bold text-slate-900">Total</p>
                  <p className="text-3xl font-extrabold tracking-tight text-violet-700">
                    {formattedPrice}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleContinueToPayment}
                  disabled={isLoading}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-violet-700 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-violet-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isLoading ? "Please wait..." : "Continue to payment"}
                  {!isLoading && <ArrowRight size={16} />}
                </button>

                {paymentMessage && (
                  <p className="mt-3 text-center text-sm leading-5 text-slate-600">
                    {paymentMessage}
                  </p>
                )}

                <div className="mt-5 flex items-start gap-3 rounded-xl bg-emerald-50 px-4 py-3.5 text-xs leading-5 text-emerald-800">
                  <ShieldCheck
                    size={17}
                    className="mt-0.5 shrink-0 text-emerald-600"
                  />
                  <span>
                    Your payment is verified by the server before course access
                    is granted.
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}

function CheckoutStep({ number, label, active = false }) {
  return (
    <li className="flex shrink-0 items-center gap-2">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-extrabold ${
          active ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-400"
        }`}
      >
        {active ? <Check size={14} /> : number}
      </span>
      <span
        className={`text-xs font-bold ${
          active ? "text-violet-800" : "text-slate-400"
        }`}
      >
        {label}
      </span>
    </li>
  );
}

function DetailPill({ icon, label }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-xl border border-violet-100 bg-violet-50/70 px-3.5 py-2.5 text-xs font-semibold text-violet-800">
      {icon} {label}
    </span>
  );
}

function IncludedItem({ children }) {
  return (
    <div className="flex items-center gap-2.5 rounded-xl bg-slate-50 px-3.5 py-3 text-xs font-medium text-slate-600">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
        <Check size={12} />
      </span>
      {children}
    </div>
  );
}

function CheckoutEmptyState({ title, message }) {
  return (
    <>
      <ConditionalNavbar />

      <main className="flex min-h-[calc(100vh-5rem)] items-center justify-center bg-white px-5 py-12">
        <section className="w-full max-w-xl rounded-3xl border border-white bg-white p-8 text-center shadow-xl shadow-violet-100/70 sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
            <GraduationCap size={30} />
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">{message}</p>

          <Link
            href="/courses"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Browse courses <ArrowRight size={16} />
          </Link>
        </section>
      </main>
    </>
  );
}
