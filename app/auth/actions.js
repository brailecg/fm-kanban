"use server";

import { redirect } from "next/navigation";
import { supabaseServer } from "../utils/supabase/server";

const getURL = () => {
  const siteURL = process?.env?.NEXT_PUBLIC_SITE_URL;
  const vercelURL = process?.env?.NEXT_PUBLIC_VERCEL_URL;
  let url = siteURL ?? vercelURL ?? "http://localhost:3000/";
  return url;
};

export async function continueWithGoogle() {
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
    return redirect(data.url);
  }
}
