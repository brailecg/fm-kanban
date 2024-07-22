"use server";
// TODO: create a webpage for this app.
import { redirect } from "next/navigation";
export default async function Home() {
  redirect("/auth");
}
