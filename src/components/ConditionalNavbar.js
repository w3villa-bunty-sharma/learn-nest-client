"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import DashboardNavbar from "@/components/DashboardNavbar";

export default function ConditionalNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  if (isLoggedIn === null) {
    return <div className="h-20 border-b border-indigo-100 bg-white" />;
  }

  return isLoggedIn ? <DashboardNavbar /> : <Navbar />;
}