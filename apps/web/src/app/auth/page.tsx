"use client"
import AuthPage from "@/components/auth";
import React from "react";
import { Navbar } from "@/components/navbar";
import { useSession } from "@/lib/auth-client";

const page = () => {
  const { data: session } = useSession();
  return (
    <div className="flex h-screen flex-col max-w-screen box-border">
      <Navbar />
      <AuthPage />
    </div>
  );
};

export default page;
