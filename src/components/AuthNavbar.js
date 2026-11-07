
"use client";

import { useState } from "react";
import Link from "next/link";

export default function AuthNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-indigo-100/70 bg-white/90 shadow-sm shadow-indigo-100/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">

        {/* BRAND LOGO */}
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-xl font-extrabold text-white shadow-lg shadow-indigo-200 transition duration-300 group-hover:-rotate-6 group-hover:scale-105">
            L
          </div>

          <div>
            <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
              Learn<span className="text-indigo-600">Nest</span>
            </h2>
            <p className="text-[10px] font-semibold tracking-wider text-slate-400">
              LEARN TODAY. GROW TOMORROW.
            </p>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative py-2 text-sm font-semibold text-slate-600 transition duration-200 hover:text-indigo-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* RIGHT ACTIONS */}
        <div className="hidden items-center gap-5 lg:flex">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-600">
              ?
            </span>
            <div>
              <p className="text-[10px] font-medium text-slate-400">
                Need assistance?
              </p>
              <Link
                href="/contact"
                className="font-bold text-slate-700 transition hover:text-indigo-600"
              >
                Get Help
              </Link>
            </div>
          </div>

          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-indigo-200 transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Back to Website
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-xl text-indigo-700 transition hover:bg-indigo-100 lg:hidden"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="border-t border-indigo-100 bg-white px-5 py-5 shadow-lg lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-4 border-t border-slate-100 pt-4">
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="mb-3 block px-4 py-2 text-sm font-semibold text-indigo-600"
            >
              Need Help? Contact Us
            </Link>

            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-5 py-3 text-center text-sm font-bold text-white shadow-md"
            >
              Back to Website →
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
