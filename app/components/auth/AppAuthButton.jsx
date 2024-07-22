"use client";
import Image from "next/image";
import { continueWithGoogle, continueAnonymously } from "../../auth/actions";
import Loader from "../Loader";
import { useState } from "react";

const buttonVariant = {
  google: {
    imgSrc:
      "https://fdksslojrpadbebswbsg.supabase.co/storage/v1/object/public/icons/icon-google.png?t=2024-05-28T02%3A26%3A18.354Z",
    text: "Continue With Google",
    alt: "Google Icon",
    width: 24,
    height: 24,
  },
  anonymous: {
    imgSrc:
      "https://fdksslojrpadbebswbsg.supabase.co/storage/v1/object/public/icons/supabase-logo-icon.png?t=2024-06-01T03%3A18%3A03.958Z",
    text: "Continue Anonymously",
    alt: "Supabase Icon",
    width: 24,
    height: 24,
  },
};

const handleAuthCall = ({ variant, setLoading }) => {
  setLoading(true);
  if (variant === "google") {
    continueWithGoogle();
  } else if (variant === "anonymous") {
    continueAnonymously();
  }
};

const AppAuthButton = ({ variant = "google", className, ...props }) => {
  const [loading, setLoading] = useState(false);

  const btn = buttonVariant[variant];

  return (
    <div className="relative">
      {loading && <Loader />}
      <button
        disabled={loading}
        onClick={() => handleAuthCall({ variant, setLoading })}
        className=" disabled:bg-gray-100 flex gap-3 shadow-md rounded-md p-2 w-80 bg-white">
        <Image
          width={btn.width}
          height={btn.height}
          alt={btn.alt}
          src={btn.imgSrc}
        />
        <span className=" text-black/50 font-semibold">{btn.text}</span>
      </button>
    </div>
  );
};

export default AppAuthButton;
