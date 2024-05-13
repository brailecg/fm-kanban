"use client";
import React from "react";
import { Button } from "../components/ui/Button";
import { supabaseBrowser } from "../utils/supabase/browser";
const Auth = () => {
  const handleLoginWithOAuth = async (provider) => {
    const supabase = supabaseBrowser();
    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: location.origin + "/auth/callback?next=/dashboard",
      },
    });
  };
  return (
    <div>
      <Button
        onClick={() => handleLoginWithOAuth("google")}
        className="border rounded-md">
        Google SignIn
      </Button>
    </div>
  );
};

export default Auth;
