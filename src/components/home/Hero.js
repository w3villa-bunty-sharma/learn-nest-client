
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#f2f4ff] px-5 py-16 sm:px-8 lg:px-10 lg:py-24">

      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">

        {/* LEFT CONTENT */}
        <div className="min-w-0">

          <div className="mb-6 inline-flex flex-wrap items-center gap-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 text-xs font-semibold text-blue-700">
            ✨ Welcome to the Future of Learning
          </div>

          <h1 className="max-w-2xl pb-2 text-4xl font-extrabold leading-[1.25] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Learn New Skills.
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 bg-clip-text pb-1 text-transparent">
              Build Your Future.
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            Discover exciting courses, develop practical skills, and
            unlock your potential with LearnNest. Your journey towards
            success starts here.
          </p>

          {/* BUTTONS */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/signup"
              className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              Get Started →
            </Link>

            <Link
              href="/courses"
              className="rounded-xl border border-indigo-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-700 transition hover:border-blue-400 hover:text-blue-600"
            >
              Explore Courses
            </Link>
          </div>

          {/* STATS */}
          <div className="mt-10 flex flex-wrap gap-8">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                20+
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Learning Topics
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                100%
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Flexible Learning
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">
                Anytime
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                Learn Anywhere
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT LEARNING CARD */}
        <div className="relative mx-auto w-full max-w-lg">

          <div className="absolute -right-5 -top-5 h-32 w-32 rounded-full bg-purple-200/50 blur-3xl" />
          <div className="absolute -bottom-5 -left-5 h-32 w-32 rounded-full bg-blue-200/60 blur-3xl" />

          <div className="relative rounded-3xl border border-white bg-white p-5 shadow-2xl shadow-indigo-100 sm:p-7">

            {/* CARD HEADER */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Welcome to LearnNest
                </p>
                <h2 className="mt-1 text-xl font-extrabold text-slate-900">
                  Your Learning Space
                </h2>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-2xl text-white">
                🎓
              </div>
            </div>

            {/* GRADIENT CARD */}
            <div className="mt-7 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-5 text-white">
              <p className="text-xs font-medium text-blue-100">
                Keep Moving Forward
              </p>

              <h3 className="mt-2 text-2xl font-extrabold">
                Your Goals, Your Journey
              </h3>

              <p className="mt-2 text-xs leading-5 text-blue-100">
                Every new skill brings you one step closer to success.
              </p>

              <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/30">
                <div className="h-full w-3/5 rounded-full bg-white" />
              </div>

              <p className="mt-2 text-right text-[10px] text-blue-100">
                Start learning today
              </p>
            </div>

            {/* LEARNING TOPICS */}
            <div className="mt-6">
              <h3 className="text-sm font-bold text-slate-800">
                Explore Learning Topics
              </h3>

              <div className="mt-4 grid grid-cols-2 gap-3">

                <div className="flex items-center gap-3 rounded-xl bg-blue-50 p-3">
                  <span className="text-xl">💻</span>
                  <span className="text-xs font-semibold text-slate-700">
                    Development
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-purple-50 p-3">
                  <span className="text-xl">🎨</span>
                  <span className="text-xs font-semibold text-slate-700">
                    Designing
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-pink-50 p-3">
                  <span className="text-xl">📊</span>
                  <span className="text-xs font-semibold text-slate-700">
                    Data Science
                  </span>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-green-50 p-3">
                  <span className="text-xl">📱</span>
                  <span className="text-xs font-semibold text-slate-700">
                    Technology
                  </span>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
