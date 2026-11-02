
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Hero from "@/components/home/Hero";
import Courses from "@/components/home/Courses";
import Benefits from "@/components/home/Benefits";
import CTA from "@/components/home/CTA";
import Footer from "@/components/Footer";



export default function Home() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen overflow-hidden bg-white">

        {/* HERO SECTION */}
        <Hero />
        
        {/* COURSES SECTION */}
        <Courses />

        {/* BENEFITS SECTION */}
        <Benefits />

        {/* CTA SECTION */}
        <CTA />


      </main>

        {/* FOOTER SECTION */}
        <Footer />
    </>
  );
}
