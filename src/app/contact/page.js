
"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  HelpCircle,
  ArrowRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    detail: "support@learnnest.com",
    description: "Send us an email anytime.",
  },
  {
    icon: Phone,
    title: "Call Us",
    detail: "+91 98765 43210",
    description: "Monday to Friday, 9 AM – 6 PM.",
  },
  {
    icon: MapPin,
    title: "Our Location",
    detail: "India",
    description: "We are here to support your learning journey.",
  },
];

const faqs = [
  {
    question: "How can I enroll in a course?",
    answer:
      "Visit our Courses page, choose your preferred course, and follow the enrollment instructions.",
  },
  {
    question: "I am facing an issue with my account. What should I do?",
    answer:
      "You can contact our support team using the form above. Share your registered email and describe the issue.",
  },
  {
    question: "How can I get help with a course?",
    answer:
      "Send us your course name and question through the contact form. Our support team will guide you.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [notice, setNotice] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Backend API integration will be added here.
    setNotice(
      "Your form UI is ready! Connect the backend API to start receiving messages."
    );

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gradient-to-r from-violet-50 via-violet-100 to-violet-50">
        {/* Hero Section */}
        <section className="px-6 pt-20 pb-14 text-center">
          <div className="mx-auto max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white px-5 py-2 text-sm font-semibold text-violet-700 shadow-sm">
              <MessageCircle size={16} />
              We'd Love to Hear From You
            </span>

            <h1 className="mt-7 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              Get in <span className="text-violet-600">Touch</span>
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
              Have a question, suggestion, or need assistance? We're here to
              help you make the most of your learning journey with LearnNest.
            </p>
          </div>
        </section>

        {/* Contact Information */}
        <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 pb-16 md:grid-cols-3">
          {contactInfo.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-violet-100 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600">
                  <Icon size={26} />
                </div>

                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 break-words font-semibold text-violet-600">
                  {item.detail}
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {item.description}
                </p>
              </div>
            );
          })}
        </section>

        {/* Contact Form Section */}
        <section className="px-6 pb-20">
          <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-5">
            {/* Left Side */}
            <div className="relative overflow-hidden bg-violet-600 p-8 text-white md:col-span-2 md:p-12">
              <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-violet-500 opacity-50" />
              <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-violet-700 opacity-60" />

              <div className="relative z-10">
                <span className="text-sm font-semibold uppercase tracking-widest text-violet-200">
                  Contact Us
                </span>

                <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-4xl">
                  Let's Start a Conversation
                </h2>

                <p className="mt-5 leading-7 text-violet-100">
                  Your feedback and questions matter to us. Fill out the form
                  and let us know how we can help.
                </p>

                <div className="mt-12 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20">
                    <Clock size={21} />
                  </div>

                  <div>
                    <p className="font-semibold">Support Hours</p>
                    <p className="text-sm text-violet-200">
                      Monday – Friday, 9 AM – 6 PM
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20">
                    <Mail size={21} />
                  </div>

                  <div>
                    <p className="font-semibold">Email Support</p>
                    <p className="text-sm text-violet-200">
                      support@learnnest.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-8 md:col-span-3 md:p-12">
              <h2 className="text-2xl font-bold text-slate-900">
                Send Us a Message
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Fill in the details below and we'll be happy to assist you.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Full Name
                    </label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-slate-700"
                    >
                      Email Address
                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      required
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Subject
                  </label>

                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Your Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message here..."
                    rows={5}
                    required
                    className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-violet-500 focus:bg-white focus:ring-2 focus:ring-violet-100"
                  />
                </div>

                {notice && (
                  <p
                    role="status"
                    className="rounded-xl bg-violet-50 p-3 text-sm text-violet-700"
                  >
                    {notice}
                  </p>
                )}

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-violet-700 hover:shadow-lg"
                >
                  Send Message
                  <Send size={17} />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm">
                <HelpCircle size={16} />
                FAQs
              </span>

              <h2 className="mt-5 text-3xl font-bold text-slate-900 sm:text-4xl">
                Frequently Asked Questions
              </h2>

              <p className="mt-3 text-slate-600">
                Find answers to some common questions.
              </p>
            </div>

            <div className="mt-10 space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-violet-100 bg-white p-6 shadow-sm transition hover:shadow-md"
                >
                  <h3 className="font-bold text-slate-900">
                    {faq.question}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-6xl rounded-3xl bg-gradient-to-r from-violet-600 to-purple-700 px-8 py-12 text-center text-white shadow-lg sm:px-14">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Grow With LearnNest?
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-violet-100">
              Explore our courses and take the next step toward your learning
              goals.
            </p>

            <a
              href="/courses"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 font-semibold text-violet-700 transition hover:bg-violet-50"
            >
              Explore Courses
              <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
