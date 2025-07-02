import AuthPage from "@/components/auth";
import React from "react";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import { Navbar } from "@/components/navbar";

const page = async () => {
  const user = await auth();
  if (user) {
    redirect("/");
  }
  return (
    <div className="flex h-screen flex-col max-w-screen box-border">
      <Navbar isLoggedIn={user !== null} user={user?.user} />
      <AuthPage />
    </div>
  );
};

export default page;
