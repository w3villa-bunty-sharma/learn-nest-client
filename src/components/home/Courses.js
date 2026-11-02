
import Link from "next/link";

const courses = [
  {
    title: "Full Stack Web Development",
    description:
      "Learn to build modern websites and powerful web applications using frontend and backend technologies.",
    icon: "💻",
    level: "Beginner to Advanced",
    duration: "12 Weeks",
    category: "Development",
    bg: "bg-blue-50",
    iconBg: "bg-blue-100",
    accent: "text-blue-600",
  },
  {
    title: "UI/UX Design",
    description:
      "Explore creative design principles and learn to create beautiful, user-friendly digital experiences.",
    icon: "🎨",
    level: "Beginner Friendly",
    duration: "8 Weeks",
    category: "Design",
    bg: "bg-purple-50",
    iconBg: "bg-purple-100",
    accent: "text-purple-600",
  },
  {
    title: "Data Science",
    description:
      "Understand data analysis, visualization, and machine learning concepts to solve real-world problems.",
    icon: "📊",
    level: "Intermediate",
    duration: "10 Weeks",
    category: "Technology",
    bg: "bg-pink-50",
    iconBg: "bg-pink-100",
    accent: "text-pink-600",
  },
];

export default function Courses() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">

        {/* SECTION HEADING */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-indigo-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
            Our Popular Courses
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Explore Courses &
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text pb-1 text-transparent">
              Discover Your Potential
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
            Build valuable skills with carefully selected learning topics
            designed to help you grow personally and professionally.
          </p>
        </div>

        {/* COURSE CARDS */}
        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course.title}
              className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-indigo-100 hover:shadow-xl hover:shadow-indigo-100/60 sm:p-7"
            >
              <div className="flex items-center justify-between">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${course.iconBg} text-2xl`}
                >
                  {course.icon}
                </div>

                <span
                  className={`rounded-full ${course.bg} px-3 py-1.5 text-[11px] font-bold ${course.accent}`}
                >
                  {course.category}
                </span>
              </div>

              <h3 className="mt-7 text-xl font-extrabold leading-snug text-slate-900 transition group-hover:text-blue-600">
                {course.title}
              </h3>

              <p className="mt-3 flex-1 text-sm leading-7 text-slate-500">
                {course.description}
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-5">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Level
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-700">
                    {course.level}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                    Duration
                  </p>
                  <p className="mt-1 text-xs font-bold text-slate-700">
                    {course.duration}
                  </p>
                </div>
              </div>

              <Link
                href="/courses"
                className="mt-6 flex items-center justify-between rounded-xl bg-indigo-50 px-5 py-3.5 text-sm font-bold text-blue-700 transition hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white"
              >
                Explore Course
                <span className="text-lg">→</span>
              </Link>
            </div>
          ))}
        </div>

        {/* BOTTOM LINK */}
        <div className="mt-12 text-center">
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 transition hover:text-purple-600"
          >
            View All Courses <span>→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
