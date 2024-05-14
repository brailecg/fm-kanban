"use server";

import { redirect } from "next/navigation";
import { supabaseServer } from "../utils/supabase/server";
import { headers } from "next/headers";

export async function login(formData) {
  const supabase = supabaseServer();
  const origin = headers().get("origin");
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback?next=/dashboard`,
    },
  });

  if (error) {
    console.log({ error });
  } else {
    return redirect(data.url);
  }
}
