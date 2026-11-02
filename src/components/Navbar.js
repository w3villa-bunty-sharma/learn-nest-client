
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Courses", href: "/courses" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
  { name: "My Learning", href: "/my-learning" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-indigo-100/80 bg-white/95 shadow-sm backdrop-blur-md">

      <nav className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">

        {/* LOGO */}
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          onClick={() => setMenuOpen(false)}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-xl font-bold text-white shadow-md shadow-blue-200">
            L
          </div>

          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              LearnNest<span className="text-blue-600">.</span>
            </h1>
            <p className="hidden text-[9px] font-medium tracking-wider text-slate-500 sm:block">
              LEARN TODAY. GROW TOMORROW.
            </p>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative py-2 text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {link.name}

                {isActive && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
                )}
              </Link>

              
            );
          })}
        </div>

        {/* DESKTOP AUTH BUTTONS */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            href="/login"
            className={`rounded-lg px-4 py-2.5 text-sm font-bold transition duration-200 hover:bg-blue-50 hover:text-blue-600 ${
              pathname === "/login"
                ? "text-blue-600"
                : "text-slate-700"
            }`}
          >
            Login
          </Link>

          <Link
            href="/signup"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 text-sm font-bold text-white shadow-md shadow-blue-200 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Get Started
            <span className="ml-2">→</span>
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-xl text-blue-700 transition hover:bg-indigo-100 lg:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="border-t border-indigo-100 bg-white px-5 py-5 shadow-lg lg:hidden">

          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-indigo-50 hover:text-blue-600"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="mt-4 flex flex-col gap-3 border-t border-slate-100 pt-4">
            <Link
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="rounded-lg border border-indigo-100 px-4 py-3 text-center text-sm font-bold text-slate-700 transition hover:bg-indigo-50"
            >
              Login
            </Link>

            <Link
              href="/signup"
              onClick={() => setMenuOpen(false)}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-3 text-center text-sm font-bold text-white shadow-md shadow-blue-100 transition hover:shadow-lg"
            >
              Get Started →
            </Link>
          </div>
        </div>
      )}

    </header>
  );
}
