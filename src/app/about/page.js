
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  BookOpen,
  Target,
  Eye,
  GraduationCap,
  Users,
  Award,
  Lightbulb,
  Heart,
  CheckCircle,
  ArrowRight,
  Rocket,
  Globe,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const values = [
  {
    icon: Lightbulb,
    title: "Quality Education",
    description:
      "We focus on providing practical, high-quality learning experiences that help students grow.",
  },
  {
    icon: Users,
    title: "Community First",
    description:
      "We believe learning becomes better when students connect, collaborate, and support each other.",
  },
  {
    icon: Rocket,
    title: "Continuous Growth",
    description:
      "We encourage lifelong learning and help learners stay ready for new opportunities.",
  },
  {
    icon: Heart,
    title: "Student Focused",
    description:
      "Every learning experience is designed around the needs and goals of our students.",
  },
];

const features = [
  {
    icon: BookOpen,
    title: "Expert-Led Courses",
    description:
      "Learn from structured courses designed to build real-world knowledge and skills.",
  },
  {
    icon: Globe,
    title: "Learn Anywhere",
    description:
      "Access your learning journey whenever and wherever it works for you.",
  },
  {
    icon: ShieldCheck,
    title: "Better Learning Experience",
    description:
      "Enjoy an organized learning platform that keeps your educational journey simple.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="overflow-hidden bg-white text-slate-900">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-violet-50 via-violet-100 to-violet-50">
          <div className="mx-auto w-[90%] max-w-7xl py-16 text-center md:py-20">
            <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 text-xs font-semibold text-violet-700 ring-1 ring-violet-200">
              <GraduationCap size={17} />
              Get to Know LearnNest
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              About <span className="text-violet-600">LearnNest</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Empowering learners to build skills, unlock opportunities, and
              achieve their career goals through quality online education.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:bg-violet-700"
              >
                Explore Courses
                <ArrowRight size={18} />
              </Link>

              <Link
                href="/contact"
                className="rounded-xl border border-violet-200 bg-white px-7 py-3.5 text-sm font-semibold text-violet-700 transition hover:bg-violet-50"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-16 md:py-20">
          <div className="mx-auto grid w-[90%] max-w-7xl items-center gap-12 md:grid-cols-2">
            <div>
              <span className="text-sm font-bold uppercase tracking-widest text-violet-600">
                Who We Are
              </span>

              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl">
                Building a Better Future Through Education
              </h2>

              <p className="mt-5 text-base leading-8 text-slate-600">
                LearnNest is a learning platform created to help students
                develop valuable skills and discover new opportunities. Our
                goal is to make online education simple, accessible, and
                effective for everyone.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-600">
                Whether you are starting your learning journey or improving
                your existing skills, LearnNest gives you a place to learn at
                your own pace and move closer to your goals.
              </p>

              <div className="mt-7 space-y-4">
                {[
                  "Flexible and self-paced learning",
                  "Practical knowledge and skill development",
                  "A supportive learning environment",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle
                      size={21}
                      className="shrink-0 text-violet-600"
                    />
                    <span className="text-sm font-medium text-slate-700 sm:text-base">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Mission and Vision Card */}
            <div className="relative rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-8 text-white shadow-xl shadow-violet-200 sm:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                <Target size={30} />
              </div>

              <h3 className="mt-7 text-2xl font-bold sm:text-3xl">
                Our Mission
              </h3>

              <p className="mt-4 text-sm leading-8 text-violet-100 sm:text-base">
                To make quality education accessible to everyone and empower
                learners with the knowledge, confidence, and skills they need
                to achieve their dreams.
              </p>

              <div className="my-7 h-px bg-white/20" />

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15">
                  <Eye size={25} />
                </div>

                <div>
                  <h4 className="font-bold">Our Vision</h4>
                  <p className="mt-1 text-sm text-violet-100">
                    A world where learning has no limits.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why LearnNest */}
        <section className="bg-slate-50 py-16 md:py-20">
          <div className="mx-auto w-[90%] max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-bold uppercase tracking-widest text-violet-600">
                Why LearnNest
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Everything You Need to Keep Growing
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                We are committed to creating a learning experience that helps
                students build confidence and achieve more.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="group rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-violet-200 hover:shadow-xl hover:shadow-violet-100/60"
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 transition group-hover:bg-violet-600 group-hover:text-white">
                      <Icon size={27} />
                    </div>

                    <h3 className="mt-6 text-xl font-bold text-slate-900">
                      {feature.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16 md:py-20">
          <div className="mx-auto w-[90%] max-w-7xl">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-bold uppercase tracking-widest text-violet-600">
                What Drives Us
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                Our Core Values
              </h2>

              <p className="mt-4 leading-8 text-slate-600">
                The principles that guide everything we do at LearnNest.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {values.map((value) => {
                const Icon = value.icon;

                return (
                  <div
                    key={value.title}
                    className="rounded-2xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100/50"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
                      <Icon size={25} />
                    </div>

                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                      {value.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-[5%] pb-16 md:pb-20">
          <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-r from-violet-600 to-indigo-700 px-6 py-14 text-center text-white sm:px-12">
            <Award size={38} className="mx-auto text-violet-100" />

            <h2 className="mt-5 text-3xl font-bold sm:text-4xl">
              Ready to Start Your Learning Journey?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-8 text-violet-100 sm:text-base">
              Take the next step towards your goals. Explore our courses and
              discover what you can achieve with LearnNest.
            </p>

            <Link
              href="/courses"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-violet-700 transition hover:-translate-y-0.5 hover:bg-violet-50"
            >
              Start Learning
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
