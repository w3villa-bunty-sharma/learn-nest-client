          import { Suspense } from "react";
          import Image from "next/image";
          import Link from "next/link";
          import { notFound } from "next/navigation";
          import { ArrowLeft, BarChart3, Check, Clock } from "lucide-react";
          import Navbar from "@/components/Navbar";
          import CourseCard from "@/components/CourseCard";
          import { courses } from "@/data/courses";

          const includes = [
            "Certificate of completion",
            "Hands-on practice projects",
            "Self-paced video lessons",
            "Instructor support",
          ];

          export function generateStaticParams() {
            return courses.map((course) => ({ slug: course.slug }));
          }

          export default function CourseDetailPage({ params }) {
            return (
              <>
                <Suspense
                  fallback={
                    <div className="h-20 border-b border-indigo-100/80 bg-white" />
                  }
                >
                  <Navbar />
                </Suspense>

                <Suspense fallback={<div className="min-h-screen bg-white" />}>
                  <CourseDetails params={params} />
                </Suspense>
              </>
            );
          }

          async function CourseDetails({ params }) {
            const { slug } = await params;

            const course = courses.find((item) => item.slug === slug);

            if (!course) notFound();

            const moreCourses = courses
              .filter((item) => item.slug !== slug)
              .slice(0, 3);

            return (
              <main className="min-h-screen bg-white">
                {/* Hero Banner */}
                <section className="bg-gradient-to-r from-violet-50 via-violet-100 to-violet-50">
                  <div className="mx-auto w-[90%] max-w-7xl py-12 md:py-14">
                    <Link
                      href="/courses"
                      className="inline-flex items-center gap-2 text-sm font-medium text-violet-700 hover:underline"
                    >
                      <ArrowLeft size={16} />
                      Back to courses
                    </Link>

                    <span className="mt-6 block w-fit rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-violet-700 ring-1 ring-violet-200">
                      {course.category}
                    </span>

                    <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
                      {course.title}
                    </h1>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
                      {course.description}
                    </p>

                    <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-600">
                      <span className="flex items-center gap-2">
                        <Clock size={16} />
                        {course.duration}
                      </span>

                      <span className="flex items-center gap-2">
                        <BarChart3 size={16} />
                        {course.level}
                      </span>
                    </div>
                  </div>
                </section>

                {/* Course Content */}
                <section className="mx-auto grid w-[90%] max-w-7xl gap-10 py-12 lg:grid-cols-3">
                  <div className="lg:col-span-2">

                    {/* Course Image */}
                    <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-violet-50 shadow-sm md:h-96">
                      {course.image ? (
                        <Image
                          src={course.image}
                          alt={course.title}
                          fill
                          priority
                          sizes="(max-width: 1024px) 100vw, 66vw"
                          className="object-cover"
                        />
                      ) : (
                        <div
                          className={`h-full w-full bg-gradient-to-br ${course.gradient}`}
                        />
                      )}
                    </div>

                    <h2 className="mt-10 text-2xl font-bold text-slate-900">
                      What this course includes
                    </h2>

                    <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                      {includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-700"
                        >
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-violet-700">
                            <Check size={14} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Price Card */}
                  <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-violet-100/60 lg:sticky lg:top-24">
                    <p className="text-sm text-slate-500">Course price</p>

                    <p className="mt-1 text-4xl font-bold text-slate-900">
                      ₹{course.price.toLocaleString("en-IN")}
                    </p>

                    <Link
                      href="/signup"
                      className="mt-6 block rounded-xl bg-violet-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-violet-700"
                    >
                      Enroll now
                    </Link>

                    <dl className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-slate-500">Duration</dt>
                        <dd className="font-medium text-slate-800">
                          {course.duration}
                        </dd>
                      </div>

                      <div className="flex justify-between">
                        <dt className="text-slate-500">Level</dt>
                        <dd className="font-medium text-slate-800">
                          {course.level}
                        </dd>
                      </div>

                      <div className="flex justify-between">
                        <dt className="text-slate-500">Category</dt>
                        <dd className="font-medium text-slate-800">
                          {course.category}
                        </dd>
                      </div>
                    </dl>
                  </aside>
                </section>

                {/* More Courses */}
                <section className="bg-slate-50 py-14">
                  <div className="mx-auto w-[90%] max-w-7xl">
                    <h2 className="text-2xl font-bold text-slate-900">
                      More courses
                    </h2>

                    <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {moreCourses.map((item) => (
                        <CourseCard key={item.slug} course={item} />
                      ))}
                    </div>
                  </div>
                </section>
              </main>
            );
          }