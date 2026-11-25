"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardNavbar from "@/components/DashboardNavbar";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Play,
  Sparkles,
} from "lucide-react";
import Footer from "@/components/Footer";
import { courses as courseCatalog } from "@/data/courses";
import { useRouter } from "next/navigation";
import { apiUrl } from "@/lib/api";

export default function MyLearningPage() {
  const [firstName, setFirstName] = useState("Learner");
  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");
      if (!storedUser) {
        setLoadingCourses(false);
        router.replace(`/login?next=${encodeURIComponent("/my-learning")}`);
        return;
      }

      const user = JSON.parse(storedUser);
      const fullName = typeof user?.name === "string" ? user.name.trim() : "";
      if (fullName) setFirstName(fullName.split(/\s+/)[0]);
      if (!token) {
        router.replace(`/login?next=${encodeURIComponent("/my-learning")}`);
        return;
      }

      fetch(apiUrl("/api/payment/enrollments"), {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(async (response) => {
          const result = await response.json();
          if (!response.ok) throw new Error(result.message || "Unable to load courses");
          const enrolled = (result.enrollments || []).map((enrollment) => {
            const course = courseCatalog.find((item) => item.slug === enrollment.slug);
            return course ? { ...course, id: enrollment.slug } : null;
          }).filter(Boolean);
          setCourses(enrolled);
        })
        .catch((error) => console.error("Unable to load enrolled courses:", error))
        .finally(() => setLoadingCourses(false));
    } catch (error) {
      console.error("Unable to read the logged-in user from localStorage.", error);
      setLoadingCourses(false);
    }
  }, [router]);



  return (
    <>
      <DashboardNavbar />
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
                Welcome, {firstName}!
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
                Choose a course, learn at your own pace, and build practical
                skills one lesson at a time.
              </p>
              <Link
                href="/courses"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-indigo-700 transition hover:bg-indigo-50"
              >
                Discover Courses <ArrowRight size={16} />
              </Link>
            </div>
          </section>

          <section className="mb-12">
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-violet-600">
                  <Play size={14} /> Pick up where you left off
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900 md:text-3xl">Continue Learning</h2>
                <p className="mt-2 text-sm text-slate-500">Jump back into a course and keep building your skills.</p>
              </div>
              <Link href="/my-courses" className="inline-flex items-center gap-2 text-sm font-semibold text-violet-700 hover:text-violet-900">
                View My Courses <ArrowRight size={16} />
              </Link>
            </div>

            {loadingCourses ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500">Loading your learning space…</div>
            ) : courses.length === 0 ? (
              <div className="relative overflow-hidden rounded-3xl border border-violet-100 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
                <div className="pointer-events-none absolute -right-10 -top-16 h-48 w-48 rounded-full bg-violet-50" />
                <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-700"><BookOpen size={25} /></div>
                <h3 className="relative mt-4 text-xl font-bold text-slate-900">Your learning journey starts here</h3>
                <p className="relative mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">Choose a course that interests you. Once enrolled, it will be ready for you here.</p>
                <Link href="/courses" className="relative mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700">Explore Courses <ArrowRight size={16} /></Link>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2">
                {courses.slice(0, 2).map((course) => (
                  <article key={course.id} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative h-52 overflow-hidden bg-slate-100">
                      <img src={course.image} alt={course.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                      <span className="absolute left-4 top-4 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-xs font-semibold text-violet-700 shadow-sm">{course.category}</span>
                    </div>
                    <div className="p-5 md:p-6">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-500"><Clock3 size={14} /> {course.duration} <span>·</span> {course.level}</div>
                      <h3 className="mt-3 text-xl font-bold leading-snug text-slate-900">{course.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">{course.description}</p>
                      <Link href={`/courses/${course.slug}`} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"><Play size={15} /> Open Course</Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
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
