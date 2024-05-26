"use server";

import { redirect } from "next/navigation";
import { supabaseServer } from "../utils/supabase/server";

const getURL = () => {
  const siteURL = process?.env?.NEXT_PUBLIC_SITE_URL;
  const vercelURL = process?.env?.NEXT_PUBLIC_VERCEL_URL;
  let url = siteURL ?? vercelURL ?? "http://localhost:3000/";

  console.log("Resolved URL:", url); // Log the resolved URL for debugging
  return url;
};

export async function login() {
  const supabase = await supabaseServer();

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: getURL() + "/auth/callback?next=/dashboard",
    },
  });

  if (error) {
    console.error("OAuth sign-in error:", error); // Log any errors
  } else {
    console.log("Redirecting to:", data.url); // Log the redirect URL
    return redirect(data.url);
  }
}
