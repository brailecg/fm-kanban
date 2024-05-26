"use server";

import { redirect } from "next/navigation";
import { supabaseServer } from "../utils/supabase/server";
import { headers } from "next/headers";

const getURL = () => {
  let url =
    process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
    process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
    "http://localhost:3000/";
  // Make sure to include `https://` when not localhost.
  // url = url.includes("http") ? url : `https://${url}`;
  // Make sure to include a trailing `/`.
  // url = url.charAt(url.length - 1) === "/" ? url : `${url}/`;
  return url;
};

export async function login() {
  const supabase = await supabaseServer();
  // const origin = headers().get("origin");

  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: getURL() + "/auth/callback?next=/dashboard",
    },
  });

  if (!error) {
    return redirect(data.url);
  }
}
