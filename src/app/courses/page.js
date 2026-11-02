"use client";

import { useMemo, useState } from "react";
import { Search, SearchX } from "lucide-react";
import Navbar from "@/components/Navbar";
import CourseCard from "@/components/CourseCard";
import { courses } from "@/data/courses";

const categories = ["All", "Development", "Design", "Programming"];

const sortOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

export default function CoursesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("popularity");

  const visibleCourses = useMemo(() => {
    const result = courses.filter(
      (course) =>
        (category === "All" || course.category === category) &&
        course.title.toLowerCase().includes(query.trim().toLowerCase())
    );

    if (sort === "price-asc") result.sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") result.sort((a, b) => b.price - a.price);
    else result.sort((a, b) => b.popularity - a.popularity);

    return result;
  }, [query, category, sort]);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white">
        {/* Hero banner */}
        <section className="bg-gradient-to-r from-violet-50 via-violet-100 to-violet-50">
          <div className="mx-auto grid w-[90%] max-w-7xl items-center gap-10 py-14 md:grid-cols-2 md:py-16">
            <div>
              <span className="inline-block rounded-full bg-violet-100 px-3.5 py-1.5 text-xs font-semibold text-violet-700 ring-1 ring-violet-200">
                Explore courses
              </span>

              <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                Explore Our <span className="text-violet-600">Courses</span>
              </h1>

              <p className="mt-4 max-w-md text-base leading-7 text-slate-600">
                Discover courses designed to help you learn new skills and grow
                your career.
              </p>
            </div>

            {/* Simple highlight card (replace with an illustration if you like) */}
            <div className="hidden justify-end md:flex">
              <div className="w-72 rounded-2xl bg-white p-6 shadow-xl shadow-violet-200/60 ring-1 ring-violet-100">
                <p className="text-sm text-slate-500">Available now</p>
                <p className="mt-1 text-4xl font-bold text-violet-700">
                  {courses.length}
                </p>
                <p className="text-sm text-slate-500">courses to start learning</p>

                <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-600">
                  <p>4 to 8 weeks per course</p>
                  <p>Beginner friendly options</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Controls + results */}
        <section className="mx-auto w-[90%] max-w-7xl py-10">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <div className="relative w-full max-w-md flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses..."
                className="w-full rounded-full border border-slate-200 bg-white py-2.5 pl-11 pr-4 text-sm outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-100"
              />
            </div>

            {/* Category chips */}
            <div className="flex flex-wrap gap-2">
              {categories.map((item) => (
                <button
                  key={item}
                  onClick={() => setCategory(item)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    category === item
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
              Showing{" "}
              <span className="font-semibold text-violet-700">
                {visibleCourses.length}
              </span>{" "}
              {visibleCourses.length === 1 ? "course" : "courses"}
            </p>

            <label className="flex items-center gap-2 text-sm text-slate-600">
              Sort by:
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-800 outline-none focus:border-violet-500"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {/* Course grid */}
          {visibleCourses.length > 0 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleCourses.map((course) => (
                <CourseCard key={course.slug} course={course} />
              ))}
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-center rounded-2xl bg-violet-50 px-6 py-14 text-center">
              <SearchX size={32} className="text-violet-500" />
              <p className="mt-3 font-semibold text-slate-900">No courses found</p>
              <p className="mt-1 text-sm text-slate-500">
                Try searching with a different course name.
              </p>
            </div>
          )}
        </section>
      </main>
    </>
  );
}