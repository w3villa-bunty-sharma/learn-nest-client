"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardNavbar from "@/components/DashboardNavbar";
import jsPDF from "jspdf";
import {
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Pencil,
  ShieldCheck,
  UserRound,
  Download,
} from "lucide-react";

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const downloadProfile = async () => {
    if (!profile) return;

    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();

    // Purple page header
    pdf.setFillColor(91, 33, 182);
    pdf.rect(0, 0, pageWidth, 68, "F");

    pdf.setTextColor(255, 255, 255);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(10);
    pdf.text("LEARNNEST  /  PROFILE", 20, 20);

    pdf.setFontSize(25);
    pdf.text("My Profile", 20, 38);

    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(11);
    pdf.text("Your personal information", 20, 48);

    // Blue photo column and profile panel
    pdf.setFillColor(239, 246, 255);
    pdf.roundedRect(14, 78, pageWidth - 28, 64, 5, 5, "F");

    pdf.setFillColor(37, 99, 235);
    pdf.roundedRect(14, 78, 58, 64, 5, 5, "F");
    pdf.rect(62, 78, 10, 64, "F");
  // Round profile photo
  const photoX = 25;
  const photoY = 91;
  const photoSize = 36;

  if (profile.profile_picture_url) {
    try {
      const response = await fetch(profile.profile_picture_url);

      if (!response.ok) {
        throw new Error("Could not fetch profile photo.");
      }

      const imageBlob = await response.blob();
      const imageData = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(imageBlob);
      });

      const imageType = imageBlob.type === "image/png" ? "PNG" : "JPEG";

      // Create a circularly cropped image before adding it to the PDF
      const roundImage = await new Promise((resolve, reject) => {
        const image = new Image();

        image.onload = () => {
          const canvas = document.createElement("canvas");
          const size = 300;
          canvas.width = size;
          canvas.height = size;

          const context = canvas.getContext("2d");
          if (!context) {
            reject(new Error("Could not prepare profile photo."));
            return;
          }

          context.beginPath();
          context.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
          context.closePath();
          context.clip();

          const cropSize = Math.min(image.width, image.height);
          const cropX = (image.width - cropSize) / 2;
          const cropY = (image.height - cropSize) / 2;

          context.drawImage(
            image,
            cropX,
            cropY,
            cropSize,
            cropSize,
            0,
            0,
            size,
            size
          );

          resolve(canvas.toDataURL("image/png"));
        };

        image.onerror = () => reject(new Error("Could not read profile photo."));
        image.src = URL.createObjectURL(imageBlob);
      });

      pdf.addImage(
        roundImage,
        "PNG",
        photoX,
        photoY,
        photoSize,
        photoSize
      );

      // A single circular border around the circular image
      pdf.setDrawColor(255, 255, 255);
      pdf.setLineWidth(1.5);
      pdf.circle(
        photoX + photoSize / 2,
        photoY + photoSize / 2,
        photoSize / 2,
        "S"
      );
    } catch (error) {
      console.error("Could not add profile photo to PDF:", error);

      pdf.setFillColor(255, 255, 255);
      pdf.circle(43, 109, 18, "F");
      pdf.setTextColor(37, 99, 235);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(16);
      pdf.text(initials, 43, 111, { align: "center" });
    }
  } else {
    // Initials if there is no profile photo
    pdf.setFillColor(255, 255, 255);
    pdf.circle(43, 109, 18, "F");
    pdf.setTextColor(37, 99, 235);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text(initials, 43, 111, { align: "center" });
  }

    // Name and learner label
    pdf.setTextColor(30, 41, 59);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(18);

    const nameLines = pdf.splitTextToSize(
      profile.name || "LearnNest learner",
      pageWidth - 112
    );
    pdf.text(nameLines.slice(0, 2), 84, 105);

    pdf.setTextColor(71, 85, 105);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text("LEARNNEST LEARNER", 84, 123);

    // Centered detail cards
    const cardX = 28;
    const cardWidth = pageWidth - 56;

    const addDetail = (label, value, y, cardHeight = 30) => {
      pdf.setFillColor(245, 243, 255);
      pdf.roundedRect(cardX, y, cardWidth, cardHeight, 4, 4, "F");

      pdf.setTextColor(124, 58, 237);
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.text(label.toUpperCase(), cardX + 9, y + 10);

      pdf.setTextColor(30, 41, 59);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(11);

      const lines = pdf.splitTextToSize(
        value || "Not provided",
        cardWidth - 18
      );

      pdf.text(lines.slice(0, 2), cardX + 9, y + 21);
    };

    addDetail("Full name", profile.name, 158);
    addDetail("Email address", profile.email, 196);
    addDetail("Address", address, 234, 34);

    // Footer
    pdf.setDrawColor(226, 232, 240);
    pdf.setLineWidth(0.5);
    pdf.line(20, pageHeight - 20, pageWidth - 20, pageHeight - 20);

    pdf.setTextColor(100, 116, 139);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(9);
    pdf.text("LearnNest • Your learning journey", 20, pageHeight - 12);
    pdf.text(
      new Date().toLocaleDateString(),
      pageWidth - 20,
      pageHeight - 12,
      { align: "right" }
    );

    pdf.save("learnnest-profile.pdf");
  };

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please log in to view your profile.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load profile.");
        }

        setProfile(data.profile);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const initials =
    profile?.name
      ?.trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((part) => part[0])
      .join("")
      .toUpperCase() || "U";

  const address = [
    profile?.address_line1,
    profile?.address_line2,
    profile?.city,
    profile?.state,
    profile?.postal_code,
    profile?.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <>
      <DashboardNavbar />

      <main className="min-h-screen bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-violet-100 via-sky-50 to-fuchsia-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/my-learning"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-violet-700"
          >
            <ArrowLeft size={16} />
            Back to My Learning
          </Link>

          <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="inline-flex rounded-full border border-violet-200 bg-white/70 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-violet-700 shadow-sm">
                Account settings
              </p>
              <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
                My profile
              </h1>
              <p className="mt-2 text-sm text-slate-600 sm:text-base">
                View and manage your personal information.
              </p>
            </div>

            <Link
              href="/profile/edit"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-700 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:-translate-y-0.5 hover:from-violet-800 hover:to-indigo-700"
            >
              <Pencil size={16} />
              Edit profile
            </Link>

            <button
              type="button"
              onClick={downloadProfile}
              disabled={!profile}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-emerald-700 disabled:opacity-50"
            >
              <Download size={16} />
              Download Profile
            </button>

          </div>

          {loading ? (
            <div className="rounded-2xl border border-white/70 bg-white/85 p-8 text-sm text-slate-500 shadow-lg shadow-violet-100/60">
              Loading your profile...
            </div>
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-white/90 p-6 shadow-lg shadow-red-100/60">
              <p className="font-semibold text-red-700">
                Could not load your profile
              </p>
              <p className="mt-1 text-sm text-red-600">{error}</p>
            </div>
          ) : profile ? (
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
              <div className="space-y-6">
                <section className="overflow-hidden rounded-2xl border border-white/80 bg-white shadow-xl shadow-violet-100/70">
                  <div className="relative h-32 overflow-hidden bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-500">
                    <div className="absolute -right-8 -top-20 h-56 w-56 rounded-full border-[26px] border-white/10" />
                    <div className="absolute bottom-[-90px] left-1/3 h-48 w-48 rounded-full bg-sky-300/30 blur-2xl" />
                    <div className="absolute right-1/4 top-5 h-16 w-16 rounded-full bg-pink-300/30 blur-xl" />
                    <div className="absolute bottom-5 left-6 rounded-full border border-white/20 bg-white/15 px-3 py-1.5 text-xs font-semibold tracking-wide text-white backdrop-blur-sm sm:left-8">
                      LEARNNEST <span className="mx-1 text-white/60">/</span> PROFILE
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 bg-white px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
                    <div className="flex items-center gap-4">
                      {profile.profile_picture_url ? (
                        <img
                          src={profile.profile_picture_url}
                          alt={profile.name || "Profile"}
                          className="h-20 w-20 rounded-2xl border-4 border-white bg-white object-cover shadow-lg ring-2 ring-violet-100"
                        />
                      ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-gradient-to-br from-violet-500 via-indigo-500 to-sky-500 text-2xl font-extrabold text-white shadow-lg ring-2 ring-violet-100">
                          {profile.name ? initials : <UserRound size={30} />}
                        </div>
                      )}

                      <div>
                        <h2 className="text-xl font-bold text-slate-950">
                          {profile.name || "Your name"}
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                          LearnNest learner
                        </p>
                      </div>
                    </div>

                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                      <CheckCircle2 size={14} />
                      Account active
                    </span>
                  </div>
                </section>

                <section className="rounded-2xl border border-violet-100 bg-white/90 p-6 shadow-lg shadow-violet-100/60 sm:p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-xl bg-gradient-to-br from-violet-100 to-fuchsia-100 p-2.5 text-violet-700">
                      <UserRound size={19} />
                    </div>
                    <div>
                      <h2 className="font-semibold text-slate-900">
                        Personal information
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Your basic account details.
                      </p>
                    </div>
                  </div>

                  <dl className="grid gap-5 sm:grid-cols-2">
                    <div className="rounded-xl bg-violet-50/70 p-4">
                      <dt className="text-xs font-bold uppercase tracking-wide text-violet-500">
                        Full name
                      </dt>
                      <dd className="mt-1.5 text-sm font-semibold text-slate-800">
                        {profile.name || "Not provided"}
                      </dd>
                    </div>
                    <div className="rounded-xl bg-sky-50/80 p-4">
                      <dt className="text-xs font-bold uppercase tracking-wide text-sky-600">
                        Email address
                      </dt>
                      <dd className="mt-1.5 break-all text-sm font-semibold text-slate-800">
                        {profile.email || "Not provided"}
                      </dd>
                    </div>
                  </dl>
                </section>

                <section className="rounded-2xl border border-sky-100 bg-white/90 p-6 shadow-lg shadow-sky-100/60 sm:p-8">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="rounded-xl bg-gradient-to-br from-sky-100 to-cyan-100 p-2.5 text-sky-700">
                      <MapPin size={19} />
                    </div>
                    <div>
                      <h2 className="font-semibold text-slate-900">Address</h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Your saved location details.
                      </p>
                    </div>
                  </div>

                  {address ? (
                    <p className="rounded-xl bg-gradient-to-r from-sky-50 to-indigo-50 p-4 text-sm leading-7 text-slate-700">
                      {address}
                    </p>
                  ) : (
                    <div className="rounded-xl border border-dashed border-sky-300 bg-sky-50/70 px-4 py-5">
                      <p className="text-sm font-semibold text-slate-700">
                        No address added yet
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Add your address from Edit profile.
                      </p>
                    </div>
                  )}
                </section>
              </div>

              <aside className="space-y-6">
                <section className="rounded-2xl border border-emerald-100 bg-white/90 p-6 shadow-lg shadow-emerald-100/60">
                  <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-gradient-to-br from-emerald-100 to-teal-100 p-2.5 text-emerald-700">
                      <ShieldCheck size={19} />
                    </div>
                    <div>
                      <h2 className="font-semibold text-slate-900">
                        Account security
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">
                        Your account is protected.
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 rounded-xl bg-emerald-50/70 p-4">
                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-700">
                      Sign-in email
                    </p>
                    <p className="mt-1.5 break-all text-sm font-medium text-slate-700">
                      {profile.email}
                    </p>
                  </div>
                </section>

                <section className="rounded-2xl border border-indigo-100 bg-white/90 p-6 shadow-lg shadow-indigo-100/60">
                  <h2 className="font-semibold text-slate-900">
                    Connected accounts
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Social accounts linked to your LearnNest account.
                  </p>

                  <div className="mt-5 space-y-3">
                    {[
                      {
                        name: "Google",
                        connected: profile.google_connected,
                        letter: "G",
                        iconClass: "bg-white text-red-500",
                      },
                      {
                        name: "Facebook",
                        connected: profile.facebook_connected,
                        letter: "f",
                        iconClass: "bg-[#1877F2] text-white",
                      },
                    ].map((provider) => (
                      <div
                        key={provider.name}
                        className="flex items-center justify-between gap-3 rounded-xl border border-slate-100 bg-slate-50 px-4 py-3"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg font-bold shadow-sm ${provider.iconClass}`}
                          >
                            {provider.letter}
                          </span>

                          <span className="truncate text-sm font-semibold text-slate-800">
                            {provider.name}
                          </span>
                        </div>

                        <span
                          className={`min-w-[76px] shrink-0 whitespace-nowrap rounded-full px-3 py-1 text-center text-xs font-semibold ${provider.connected
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-red-100 text-red-700"
                            }`}
                        >
                          {provider.connected ? "Active" : "Inactive"}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="relative overflow-hidden rounded-2xl border border-fuchsia-200 bg-gradient-to-br from-violet-100 via-fuchsia-50 to-sky-100 p-6 shadow-lg shadow-fuchsia-100/70">
                  <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-fuchsia-200/50 blur-xl" />
                  <div className="relative">
                    <p className="text-sm font-bold text-violet-950">
                      Keep your profile current
                    </p>
                    <p className="mt-2 text-sm leading-6 text-violet-800">
                      Update your details whenever your information changes.
                    </p>
                    <Link
                      href="/profile/edit"
                      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/80 px-3 py-2 text-sm font-semibold text-violet-800 shadow-sm transition hover:bg-white"
                    >
                      Update details <Pencil size={14} />
                    </Link>
                  </div>
                </section>
              </aside>
            </div>
          ) : null}
        </div>
      </main>
    </>
  );
}