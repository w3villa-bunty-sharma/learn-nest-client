"use client";

import { useRouter } from "next/navigation";

export default function EnrollButton({ courseSlug }) {
  const router = useRouter();

  const handleEnroll = () => {
    const checkoutPath = `/checkout?course=${encodeURIComponent(courseSlug)}`;
    const token = localStorage.getItem("token");

    if (token) {
      router.push(checkoutPath);
      return;
    }

    router.push(`/login?next=${encodeURIComponent(checkoutPath)}`);
  };

  return (
    <button
      type="button"
      onClick={handleEnroll}
      className="mt-6 block w-full rounded-xl bg-violet-600 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-violet-700"
    >
      Enroll now
    </button>
  );
}
