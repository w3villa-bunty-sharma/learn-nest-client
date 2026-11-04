
import { Suspense } from "react";
import AuthNavbar from "@/components/AuthNavbar";
import VerifyEmailContent from "./VerifyEmailContent";

export default function VerifyEmailPage() {
  return (
    <>
      <AuthNavbar />

      <Suspense
        fallback={
          <main className="flex min-h-screen items-center justify-center bg-[#eef0ff]">
            <p className="text-slate-600">Loading...</p>
          </main>
        }
      >
        <VerifyEmailContent />
      </Suspense>
    </>
  );
}
