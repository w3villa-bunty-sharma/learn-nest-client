"use client";

import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowRight, BookOpenCheck, Check, GraduationCap, Sparkles } from "lucide-react";
import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";
import { courses } from "@/data/courses";

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<main className="min-h-screen bg-[#f7f8fc]" />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const courseSlug = searchParams.get("course");
  const course = courses.find((item) => item.slug === courseSlug);

  return (
    <>
      <DashboardNavbar />
      <main className="min-h-[calc(100vh-4rem)] bg-[#f7f8fc] px-5 py-12 text-slate-900 md:px-8 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-xl shadow-emerald-100/50">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-10 text-center text-white sm:px-10">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-emerald-600 shadow-lg">
                <Check size={34} strokeWidth={3} />
              </div>
              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-50">
                <Sparkles size={14} /> Payment confirmed
              </span>
              <ol aria-label="Checkout steps confirmed" className="mx-auto mt-5 flex max-w-xl flex-wrap items-center justify-center gap-2">
                {["Review", "Payment", "Access"].map((step) => (
                  <li key={step} className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-2 text-xs font-semibold text-white sm:text-sm">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-emerald-600">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    {step} Confirmed
                  </li>
                ))}
              </ol>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Payment successful!</h1>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-emerald-50 sm:text-base">
                You’re enrolled and your course is ready. Start learning whenever you’re ready.
              </p>
            </div>

            <div className="p-6 sm:p-9">
              {course ? (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex sm:items-center sm:gap-5">
                  <div className="relative mb-4 h-44 overflow-hidden rounded-xl bg-violet-100 sm:mb-0 sm:h-28 sm:w-44 sm:shrink-0">
                    {course.image && <Image src={course.image} alt={course.title} fill sizes="(max-width: 640px) 100vw, 176px" className="object-cover" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-violet-700">{course.category}</p>
                    <h2 className="mt-1 text-xl font-bold text-slate-900">{course.title}</h2>
                    <p className="mt-2 flex items-center gap-2 text-sm text-slate-500"><GraduationCap size={16} /> Course access is now available</p>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-5 text-center">
                  <BookOpenCheck className="mx-auto text-emerald-600" size={28} />
                  <h2 className="mt-2 font-bold">Your course access is ready</h2>
                  <p className="mt-1 text-sm text-slate-600">Open My Courses to choose a course from your library.</p>
                </div>
              )}

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {course ? (
                  <Link href={`/courses/${course.slug}`} className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700">
                    Open My Course <ArrowRight size={17} />
                  </Link>
                ) : (
                  <Link href="/my-courses" className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3.5 text-sm font-bold text-white hover:bg-violet-700">
                    Go to My Courses <ArrowRight size={17} />
                  </Link>
                )}
                <Link href="/my-courses" className="inline-flex items-center justify-center gap-2 rounded-xl border border-violet-200 bg-white px-5 py-3.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50">
                  <BookOpenCheck size={17} /> View My Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
