"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Play,
  TrendingUp,
  Trophy,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";
import Footer from "@/components/Footer";

const courses = [
  {
    id: 1,
    title: "Complete React.js Development",
    slug: "react-js-development",
    category: "Web Development",
    instructor: "John Smith",
    progress: 75,
    completedLessons: 18,
    totalLessons: 24,
    duration: "12h 30m",
    color: "bg-blue-100",
    icon: "⚛️",
    image: "/images/courses/react.jpg",
    nextLesson: "React Hooks & State Management",
  },
 {
    id: 2,
    slug: "data-analytics",
    title: "Data Analytics",
    category: "Programming",
    instructor: "Jane Doe",
    progress: 50,
    completedLessons: 10,
    totalLessons: 20,
    duration: "8h 15m",
    color: "bg-green-100",
    icon: "📊",
    image: "/images/courses/data-analytics.jpg",
    nextLesson: "Data Visualization with Python",
  },
   
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    slug: "ui-ux-design",
    category: "Design",
    instructor: "Michael Brown",
    progress: 90,
    completedLessons: 18,
    totalLessons: 20,
    duration: "8h 20m",
    color: "bg-purple-100",
    icon: "🎨",
    image: "/images/courses/ui-ux.jpg",
    nextLesson: "Prototyping & User Testing",
  },
];

const stats = [
  {
    label: "Enrolled Courses",
    value: "03",
    icon: BookOpen,
    detail: "Your learning library",
    color: "bg-blue-50 text-blue-600",
  },
  {
    label: "In Progress",
    value: "03",
    icon: TrendingUp,
    detail: "Keep the momentum",
    color: "bg-violet-50 text-violet-600",
  },
  {
    label: "Completed",
    value: "00",
    icon: Trophy,
    detail: "Achievements earned",
    color: "bg-amber-50 text-amber-600",
  },
  {
    label: "Learning Hours",
    value: "12.5",
    icon: Clock3,
    detail: "Time invested so far",
    color: "bg-emerald-50 text-emerald-600",
  },
];

export default function MyLearningPage() {
  return (
    <>
      <main className="min-h-screen bg-[#f7f8fc] text-slate-900">
        <div className="mx-auto max-w-7xl px-5 py-8 md:px-8 md:py-10">
          {/* Page Heading */}
          <div className="mb-9 flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-white px-3 py-1.5 text-xs font-semibold text-violet-700 shadow-sm">
                <Sparkles size={14} />
                YOUR LEARNING SPACE
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                Welcome back, Learner!
              </h1>
              <p className="mt-2 text-sm text-slate-500 md:text-base">
                Every step forward brings you closer to your goals.
              </p>
            </div>

            <Link
              href="/courses"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700"
            >
              Explore Courses <ArrowRight size={17} />
            </Link>
          </div>

          {/* Welcome Banner */}
          <section className="relative mb-9 overflow-hidden rounded-3xl bg-gradient-to-r from-violet-700 via-indigo-700 to-blue-700 p-7 text-white shadow-xl shadow-indigo-100 md:p-9">
            <div className="pointer-events-none absolute -right-10 -top-24 h-72 w-72 rounded-full border-[35px] border-white/10" />
            <div className="pointer-events-none absolute -bottom-28 right-1/3 h-64 w-64 rounded-full bg-white/5 blur-2xl" />

            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-medium text-violet-100">
                <GraduationCap size={15} />
                Keep building your future
              </span>
              <h2 className="mt-5 text-2xl font-bold leading-tight md:text-3xl">
                Your next big achievement
                <br className="hidden sm:block" /> starts with one lesson.
              </h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-indigo-100">
                You are making progress. Stay consistent, complete your lessons
                and keep moving towards your learning goals.
              </p>
              <Link
                href="/courses"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50"
              >
                Discover Courses <ArrowRight size={16} />
              </Link>
            </div>
          </section>

          {/* Statistics */}
          <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">
                        {item.label}
                      </p>
                      <h3 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                        {item.value}
                      </h3>
                    </div>
                    <div className={`rounded-xl p-3 ${item.color}`}>
                      <Icon size={21} />
                    </div>
                  </div>
                  <p className="mt-3 text-xs text-slate-400">{item.detail}</p>
                </div>
              );
            })}
          </section>

          {/* Continue Learning */}
          <section className="mb-12">
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-violet-600">
                  <Play size={15} />
                  PICK UP WHERE YOU LEFT OFF
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  Continue Learning
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Jump back into your courses and keep making progress.
                </p>
              </div>
              <span className="text-sm font-medium text-slate-400">
                2 featured courses
              </span>
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
              {courses.slice(0, 2).map((course) => (
                <article
                  key={course.id}
                  className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-lg"
                >
                  <div className="flex flex-col sm:flex-row">
                    <div className="relative flex h-48 shrink-0 items-center justify-center overflow-hidden bg-slate-100 sm:h-auto sm:w-44">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="absolute inset-0 h-full w-full object-cover"
                      />
                      <span className="absolute bottom-3 left-3 rounded-lg bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm">
                        {course.category}
                      </span>
                    </div>

                    <div className="flex-1 p-5">
                      <p className="text-xs font-medium text-slate-400">
                        INSTRUCTOR · {course.instructor}
                      </p>
                      <h3 className="mt-2 text-lg font-bold leading-snug text-slate-900">
                        {course.title}
                      </h3>

                      <div className="mt-5 flex items-center justify-between text-sm">
                        <span className="font-medium text-slate-500">
                          Course progress
                        </span>
                        <span className="font-bold text-violet-700">
                          {course.progress}%
                        </span>
                      </div>

                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500"
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>

                      <p className="mt-2 text-xs text-slate-400">
                        {course.completedLessons} of {course.totalLessons}{" "}
                        lessons completed
                      </p>

                      <div className="mt-4 rounded-lg bg-violet-50 px-3 py-2">
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-violet-500">
                          Up next
                        </p>
                        <p className="mt-1 text-xs font-medium text-violet-900">
                          {course.nextLesson}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Clock3 size={14} /> {course.duration}
                    </span>
                    <Link
                      href={`/courses/${course.slug}`}
                      className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-violet-700"
                    >
                      <Play size={13} /> Continue Learning
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* All Enrolled Courses */}
          <section>
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-violet-600">
                  <LayoutDashboard size={15} />
                  YOUR LIBRARY
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  My Enrolled Courses
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  Track your progress across all enrolled courses.
                </p>
              </div>
              <span className="rounded-full border border-violet-100 bg-violet-50 px-4 py-2 text-sm font-semibold text-violet-700">
                {courses.length} Courses
              </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
              {courses.map((course, index) => (
                <div
                  key={course.id}
                  className={`flex flex-col gap-5 p-5 transition hover:bg-slate-50/70 md:flex-row md:items-center md:px-6 ${
                    index !== courses.length - 1
                      ? "border-b border-slate-100"
                      : ""
                  }`}
                >
                  <div className="relative h-20 w-full shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:w-28">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-violet-600">
                      {course.category}
                    </p>
                    <h3 className="mt-1 font-bold text-slate-900">
                      {course.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      Instructor: {course.instructor}
                    </p>
                  </div>

                  <div className="w-full md:w-44">
                    <div className="mb-2 flex justify-between text-xs">
                      <span className="text-slate-500">Progress</span>
                      <span className="font-bold text-slate-700">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-600 to-indigo-500"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                    <p className="mt-1.5 text-[11px] text-slate-400">
                      {course.completedLessons}/{course.totalLessons} lessons
                    </p>
                  </div>

                  <Link
                    href={`/courses/${course.slug}`}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-violet-200 px-4 py-2.5 text-xs font-semibold text-violet-700 transition hover:bg-violet-50"
                  >
                    View Course <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Motivation */}
          <section className="mt-10 flex flex-col items-start justify-between gap-5 rounded-2xl border border-violet-100 bg-white p-6 shadow-sm md:flex-row md:items-center md:p-8">
            <div className="flex items-start gap-4">
              <div className="rounded-xl bg-violet-100 p-3 text-violet-700">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Small steps lead to big achievements.
                </h2>
                <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500">
                  Stay consistent with your learning routine. Your future self
                  will thank you for the effort you put in today.
                </p>
              </div>
            </div>
            <Link
              href="/courses"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
            >
              Explore More <ArrowRight size={16} />
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
