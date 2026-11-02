"use client";

import Link from "next/link";
import {
  ArrowRight,
  Mail,
  Phone,
  GraduationCap,
  Headphones,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950 px-5 pb-8 pt-16 text-white sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">

        {/* NEWSLETTER SECTION */}
        <div className="mb-14 flex flex-col justify-between gap-7 rounded-2xl border border-white/10 bg-gradient-to-r from-indigo-950 to-violet-950 p-7 md:flex-row md:items-center md:p-9">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300">
              Stay Updated
            </span>

            <h2 className="mt-3 text-2xl font-bold md:text-3xl">
              Never Miss a Learning Opportunity
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              Get updates about new courses, learning resources and exclusive
              opportunities delivered to your inbox.
            </p>
          </div>

          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-400 focus:border-indigo-400"
            />

            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
            >
              Subscribe <ArrowRight size={16} />
            </button>
          </form>
        </div>

        {/* MAIN FOOTER */}
        <div className="grid gap-10 border-b border-white/10 pb-12 sm:grid-cols-2 lg:grid-cols-5">

          {/* BRAND */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-xl font-extrabold shadow-lg shadow-indigo-900/40">
                L
              </div>

              <span className="text-2xl font-extrabold tracking-tight">
                Learn<span className="text-indigo-400">Nest</span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">
              Empowering learners to build skills, unlock opportunities and
              achieve their career goals through quality online education.
              Start learning today and create a better tomorrow.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-indigo-300">
              <GraduationCap size={19} />
              Learn Today. Grow Tomorrow.
            </div>

            {/* SOCIAL LINKS */}
            <div className="mt-7 flex items-center gap-3">
              {[
                { label: "f", name: "Facebook" },
                { label: "ig", name: "Instagram" },
                { label: "in", name: "LinkedIn" },
                { label: "▶", name: "YouTube" },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-sm font-bold text-slate-400 transition hover:border-indigo-400 hover:bg-indigo-500 hover:text-white"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
          {/* END BRAND */}

          {/* EXPLORE */}
          <div>
            <h3 className="text-base font-bold text-white">Explore</h3>

            <ul className="mt-6 space-y-4 text-sm text-slate-400">
              <li><Link href="/" className="transition hover:text-indigo-400">Home</Link></li>
              <li><Link href="/courses" className="transition hover:text-indigo-400">All Courses</Link></li>
              <li><Link href="/courses" className="transition hover:text-indigo-400">Popular Courses</Link></li>
              <li><Link href="/about" className="transition hover:text-indigo-400">About LearnNest</Link></li>
              <li><Link href="/contact" className="transition hover:text-indigo-400">Contact Us</Link></li>
            </ul>
          </div>

          {/* LEARNING CATEGORIES */}
          <div>
            <h3 className="text-base font-bold text-white">Categories</h3>

            <ul className="mt-6 space-y-4 text-sm text-slate-400">
              <li><Link href="/courses" className="transition hover:text-indigo-400">Web Development</Link></li>
              <li><Link href="/courses" className="transition hover:text-indigo-400">Backend Development</Link></li>
              <li><Link href="/courses" className="transition hover:text-indigo-400">UI/UX Design</Link></li>
              <li><Link href="/courses" className="transition hover:text-indigo-400">Programming</Link></li>
              <li><Link href="/courses" className="transition hover:text-indigo-400">Data Analytics</Link></li>
            </ul>
          </div>

          {/* STUDENT SUPPORT */}
          <div>
            <h3 className="text-base font-bold text-white">Student Support</h3>

            <ul className="mt-6 space-y-4 text-sm text-slate-400">
              <li><Link href="/my-learning" className="transition hover:text-indigo-400">My Learning</Link></li>
              <li><Link href="/login" className="transition hover:text-indigo-400">Student Login</Link></li>
              <li><Link href="/signup" className="transition hover:text-indigo-400">Create Account</Link></li>
              <li><Link href="/contact" className="transition hover:text-indigo-400">Help & Support</Link></li>
              <li><Link href="/contact" className="transition hover:text-indigo-400">FAQs</Link></li>
            </ul>
          </div>
        </div>

        {/* CONTACT INFORMATION */}
        <div className="grid gap-5 border-b border-white/10 py-8 sm:grid-cols-3">

          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-white/5 p-3 text-indigo-400">
              <Mail size={19} />
            </div>

            <div>
              <p className="text-xs text-slate-500">Email Us</p>
              <p className="mt-1 text-sm font-medium text-slate-300">
                support@learnnest.com
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-white/5 p-3 text-indigo-400">
              <Phone size={19} />
            </div>

            <div>
              <p className="text-xs text-slate-500">Call Us</p>
              <p className="mt-1 text-sm font-medium text-slate-300">
                +91 98765 43210
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-white/5 p-3 text-indigo-400">
              <Headphones size={19} />
            </div>

            <div>
              <p className="text-xs text-slate-500">Learning Support</p>
              <p className="mt-1 text-sm font-medium text-slate-300">
                Here to help you learn
              </p>
            </div>
          </div>
        </div>

        {/* FOOTER BOTTOM */}
        <div className="flex flex-col items-center justify-between gap-5 pt-7 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-slate-500">
            © 2026 LearnNest. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-500">
            <Link href="/privacy-policy" className="transition hover:text-indigo-400">
              Privacy Policy
            </Link>

            <Link href="/terms" className="transition hover:text-indigo-400">
              Terms & Conditions
            </Link>

            <Link href="/contact" className="transition hover:text-indigo-400">
              Help Center
            </Link>
          </div>

          <p className="text-xs text-slate-500">
            Made with <span className="text-pink-400">♥</span> for learners.
          </p>
        </div>

      </div>
    </footer>
  );
}