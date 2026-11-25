"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, SearchX } from "lucide-react";
import DashboardNavbar from "@/components/DashboardNavbar";
import CourseCard from "@/components/CourseCard";
import Footer from "@/components/Footer";
import { courses as courseCatalog } from "@/data/courses";
import { apiUrl } from "@/lib/api";

const categories = ["All", "Development", "Design", "Programming"];

export default function MyCoursesPage() {
  const router = useRouter();
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace(`/login?next=${encodeURIComponent("/my-courses")}`);
      return;
    }

    let cancelled = false;
    fetch(apiUrl("/api/payment/enrollments"), {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok) throw new Error(result.message || "Unable to load courses");
        const enrolled = (result.enrollments || [])
          .map(({ slug }) => courseCatalog.find((course) => course.slug === slug))
          .filter(Boolean);
        if (!cancelled) setEnrolledCourses(enrolled);
      })
      .catch((error) => console.error("Unable to load enrolled courses:", error))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [router]);

  const visibleCourses = useMemo(() => enrolledCourses.filter((course) => {
    const matchesCategory = category === "All" || course.category === category;
    const matchesSearch = course.title.toLowerCase().includes(query.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  }), [enrolledCourses, query, category]);

  return (
    <>
      <DashboardNavbar />
      <main className="min-h-screen bg-white text-slate-900">
        <section className="bg-gradient-to-r from-violet-50 via-violet-100 to-violet-50">
          <div className="mx-auto grid w-[90%] max-w-7xl items-center gap-10 py-14 md:grid-cols-2 md:py-16">
            <div>
              <span className="inline-block rounded-full bg-violet-100 px-3.5 py-1.5 text-xs font-semibold text-violet-700 ring-1 ring-violet-200">
                Your learning library
              </span>
              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                My <span className="text-violet-600">Courses</span>
              </h1>
              <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
                Pick up where you left off and keep growing your skills with the courses you joined.
              </p>
            </div>

            <div className="hidden justify-end md:flex">
              <div className="w-72 rounded-2xl bg-white p-6 shadow-xl shadow-violet-200/60 ring-1 ring-violet-100">
                <p className="text-sm text-slate-500">In your library</p>
                <p className="mt-1 text-4xl font-bold text-violet-700">
                  {loading ? "—" : enrolledCourses.length}
                </p>
                <p className="text-sm text-slate-500">{enrolledCourses.length === 1 ? "enrolled course" : "enrolled courses"}</p>
                <div className="mt-5 border-t border-slate-100 pt-4 text-sm text-slate-600">
                  Learn at your own pace
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto w-[90%] max-w-7xl py-10">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative w-full max-w-md flex-1">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search your courses..."
                className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${category === item
                    ? "bg-violet-600 text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:text-violet-700"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              {loading ? "Loading your courses…" : <>Showing <span className="font-semibold text-violet-700">{visibleCourses.length}</span> {visibleCourses.length === 1 ? "course" : "courses"}</>}
            </p>
          </div>

          {loading ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((item) => <div key={item} className="h-80 animate-pulse rounded-2xl bg-violet-50" />)}
            </div>
          ) : visibleCourses.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleCourses.map((course) => <CourseCard key={course.slug} course={course} />)}
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-center rounded-2xl bg-violet-50 px-6 py-14 text-center">
              <SearchX size={32} className="text-violet-500" />
              <p className="mt-3 font-semibold text-slate-900">{enrolledCourses.length ? "No courses found" : "Your course library is empty"}</p>
              <p className="mt-1 text-sm text-slate-500">
                {enrolledCourses.length ? "Try another search or category." : "Enroll in a course and it will show up here."}
              </p>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
