
import Link from "next/link";

export default function CTA() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-7 py-16 text-center shadow-2xl shadow-indigo-200/60 sm:px-12 lg:py-20">

          {/* DECORATIVE BACKGROUND CIRCLES */}
          <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -bottom-32 -right-16 h-80 w-80 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute right-1/4 top-10 h-24 w-24 rounded-full bg-white/5 blur-2xl" />

          <div className="relative mx-auto max-w-3xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
              Start Your Learning Journey
            </span>

            <h2 className="mt-6 text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to Build Your
              <span className="block pb-1">Future with LearnNest?</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-blue-100 sm:text-base">
              Take the first step towards your goals. Explore new skills,
              discover opportunities, and start learning today.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-bold text-indigo-700 shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-blue-50"
              >
                Get Started Free
                <span className="text-lg">→</span>
              </Link>

              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-7 py-4 text-sm font-bold text-white transition duration-300 hover:-translate-y-1 hover:bg-white/20"
              >
                Explore Courses
              </Link>
            </div>

            <p className="mt-7 text-xs font-medium text-blue-100">
              Learn Today. Grow Tomorrow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
