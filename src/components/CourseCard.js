import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Clock } from "lucide-react";

export default function CourseCard({ course }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-violet-100">

      {/* Course Image */}
      <div className="relative h-48 w-full overflow-hidden bg-violet-50">
        {course.image ? (
          <Image
            src={course.image}
            alt={course.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition duration-500 hover:scale-105"
          />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${course.gradient}`} />
        )}

        <span className="absolute bottom-3 left-3 rounded-md bg-white px-2.5 py-1 text-xs font-semibold text-violet-700 shadow-sm">
          {course.category}
        </span>
      </div>

      {/* Course Details */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-semibold text-slate-900">
          {course.title}
        </h3>

        <p className="mt-1.5 flex-1 text-sm leading-6 text-slate-500">
          {course.description}
        </p>

        <div className="mt-4 flex items-center gap-3 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Clock size={14} />
            {course.duration}
          </span>

          <span className="h-3 w-px bg-slate-300" />

          <span className="flex items-center gap-1.5">
            <BarChart3 size={14} />
            {course.level}
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-lg font-bold text-slate-900">
            ₹{Number(course.price).toLocaleString("en-IN")}
          </p>

          <Link
            href={`/courses/${course.slug}`}
            className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            View Course
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}