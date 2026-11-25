import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BarChart3, Check, Clock, PlayCircle } from "lucide-react";
import { courses } from "@/data/courses";
import ConditionalNavbar from "@/components/ConditionalNavbar";
import EnrollButton from "@/components/EnrollButton";

const defaultIncludes = [
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
      <ConditionalNavbar />
      <Suspense fallback={<div className="min-h-screen bg-slate-50" aria-label="Loading course details" />}>
        <CourseDetails params={params} />
      </Suspense>
    </>
  );
}

async function CourseDetails({ params }) {
  const { slug } = await params;
  const course = courses.find((item) => item.slug === slug);

  if (!course) notFound();

  const includes = course.includes?.length ? course.includes : defaultIncludes;
  const outcomes = course.learningOutcomes ?? course.outcomes ?? [];
  const curriculum = course.curriculum ?? course.modules ?? [];
  const instructor = course.instructor;

  return (
      <main className="min-h-screen bg-slate-50">
        <section className="bg-gradient-to-r from-violet-50 via-violet-100 to-violet-50">
          <div className="mx-auto w-[90%] max-w-7xl py-10 md:py-14">
            <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-medium text-violet-700 hover:underline">
              <ArrowLeft size={16} /> Back to courses
            </Link>
            <span className="mt-6 block w-fit rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-violet-700 ring-1 ring-violet-200">
              {course.category}
            </span>
            <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">{course.title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">{course.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-600">
              <span className="flex items-center gap-2"><Clock size={16} />{course.duration}</span>
              <span className="flex items-center gap-2"><BarChart3 size={16} />{course.level}</span>
            </div>
          </div>
        </section>

        <div className="mx-auto grid w-[90%] max-w-7xl gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:py-12">
          <div className="space-y-8">
            <div className="relative h-64 overflow-hidden rounded-2xl bg-violet-100 shadow-sm md:h-[420px]">
              {course.image ? (
                <Image src={course.image} alt={course.title} fill priority sizes="(max-width: 1024px) 90vw, 800px" className="object-cover" />
              ) : (
                <div className={`h-full w-full bg-gradient-to-br ${course.gradient ?? "from-violet-200 to-indigo-300"}`} />
              )}
            </div>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-900">About this course</h2>
              <p className="mt-4 leading-7 text-slate-600">{course.longDescription ?? course.description}</p>
            </section>

            {outcomes.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900">What you’ll learn</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {outcomes.map((outcome, index) => (
                    <li key={`${outcome}-${index}`} className="flex gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                      <Check size={18} className="mt-1 shrink-0 text-violet-700" />{outcome}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {curriculum.length > 0 && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900">Course curriculum</h2>
                <div className="mt-5 divide-y divide-slate-100">
                  {curriculum.map((module, index) => {
                    const title = typeof module === "string" ? module : module.title;
                    const lessons = typeof module === "string" ? null : module.lessons;
                    const duration = typeof module === "string" ? null : module.duration;
                    return (
                      <div key={`${title}-${index}`} className="flex items-start justify-between gap-4 py-4">
                        <div className="flex gap-3">
                          <PlayCircle size={19} className="mt-0.5 shrink-0 text-violet-600" />
                          <div>
                            <p className="font-semibold text-slate-800">{title}</p>
                            {lessons != null && <p className="mt-1 text-sm text-slate-500">{lessons} lessons</p>}
                          </div>
                        </div>
                        {duration && <span className="shrink-0 text-sm text-slate-500">{duration}</span>}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
              <h2 className="text-2xl font-bold text-slate-900">What this course includes</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {includes.map((item) => (
                  <li key={item} className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-medium text-slate-700">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-100 text-violet-700"><Check size={14} /></span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            {instructor && (
              <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
                <h2 className="text-2xl font-bold text-slate-900">Your instructor</h2>
                <div className="mt-5 flex items-start gap-4">
                  {instructor.image && <Image src={instructor.image} alt={instructor.name} width={64} height={64} className="h-16 w-16 rounded-full object-cover" />}
                  <div>
                    <p className="font-semibold text-slate-900">{instructor.name}</p>
                    {instructor.title && <p className="mt-1 text-sm text-violet-700">{instructor.title}</p>}
                    {instructor.bio && <p className="mt-3 leading-7 text-slate-600">{instructor.bio}</p>}
                  </div>
                </div>
              </section>
            )}

            {(course.prerequisites?.length > 0 || course.audience?.length > 0) && (
              <section className="grid gap-6 md:grid-cols-2">
                {course.audience?.length > 0 && <InfoList title="Who this course is for" items={course.audience} />}
                {course.prerequisites?.length > 0 && <InfoList title="Requirements" items={course.prerequisites} />}
              </section>
            )}
          </div>

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-lg shadow-violet-100/60 lg:sticky lg:top-24">
            <p className="text-sm text-slate-500">Course price</p>
            <p className="mt-1 text-4xl font-bold text-slate-900">₹{Number(course.price).toLocaleString("en-IN")}</p>
            <EnrollButton courseSlug={course.slug} />
            <p className="mt-3 text-center text-xs leading-5 text-slate-500">Sign up or log in to continue to checkout.</p>
            <dl className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm">
              <Detail label="Duration" value={course.duration} />
              <Detail label="Level" value={course.level} />
              <Detail label="Category" value={course.category} />
              {course.accessDuration && <Detail label="Access" value={course.accessDuration} />}
            </dl>
          </aside>
        </div>
      </main>
  );
}

function Detail({ label, value }) {
  return <div className="flex justify-between gap-4"><dt className="text-slate-500">{label}</dt><dd className="text-right font-medium text-slate-800">{value}</dd></div>;
}

function InfoList({ title, items }) {
  return <section className="rounded-2xl border border-slate-200 bg-white p-6">
    <h2 className="text-lg font-bold text-slate-900">{title}</h2>
    <ul className="mt-4 space-y-3">{items.map((item, index) => <li key={`${item}-${index}`} className="flex gap-3 text-sm leading-6 text-slate-600"><Check size={17} className="mt-1 shrink-0 text-violet-700" />{item}</li>)}</ul>
  </section>;
}
