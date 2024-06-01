"use server";
import { redirect } from "next/navigation";
export default async function Home() {
  return (
    <div className="flex items-center justify-center min-h-dvh">
      Under Maintenance. Working on Fixes.
    </div>
  );
  // redirect("/auth");
}
