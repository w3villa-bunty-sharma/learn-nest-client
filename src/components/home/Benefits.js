
const benefits = [
  {
    icon: "📚",
    title: "Flexible Learning",
    description:
      "Learn at your own pace with flexible learning options that fit your schedule and lifestyle.",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: "🎓",
    title: "Expert Instructors",
    description:
      "Learn from experienced instructors who guide you with practical knowledge and industry insights.",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: "🚀",
    title: "Career Growth",
    description:
      "Develop valuable skills and build confidence to take the next step in your professional journey.",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
  },
];

export default function Benefits() {
  return (
    <section className="bg-[#f7f8ff] px-5 py-20 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">

        {/* SECTION HEADING */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-xs font-bold uppercase tracking-wider text-indigo-600">
            Why Choose LearnNest
          </span>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Everything You Need
            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text pb-1 text-transparent">
              to Learn and Grow
            </span>
          </h2>

          <p className="mt-5 text-sm leading-7 text-slate-500 sm:text-base">
            We provide the right learning environment to help you gain
            knowledge, improve your skills, and achieve your goals.
          </p>
        </div>

        {/* BENEFIT CARDS */}
        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className="group rounded-3xl border border-white bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-indigo-100/70"
            >
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl ${benefit.iconBg} text-3xl transition duration-300 group-hover:scale-110`}
              >
                {benefit.icon}
              </div>

              <h3 className="mt-7 text-xl font-extrabold text-slate-900 transition group-hover:text-blue-600">
                {benefit.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-500">
                {benefit.description}
              </p>

              <div className="mt-7 flex items-center gap-2 text-sm font-bold text-indigo-600">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-50">
                  ✓
                </span>
                <span>Learn with LearnNest</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
