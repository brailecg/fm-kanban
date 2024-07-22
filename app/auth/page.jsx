import { continueWithGoogle, continueAnonymously } from "./actions";
import { redirect } from "next/navigation";
import { supabaseServer } from "../utils/supabase/server";
import Image from "next/image";
import AppAuthButton from "../components/auth/AppAuthButton";

const Auth = async () => {
  const supabase = await supabaseServer();
  const { data, error } = await supabase.auth.getUser();

  if (data?.user && !error) {
    redirect("/dashboard");
  }
  return (
    <div className="flex justify-center flex-col md:flex-row md:justify-normal items-center h-dvh max-w-5xl mx-auto px-4 min-w-40 ">
      <div className="flex mb-4 sm:items-start sm:justify-around flex-col space-y-4 sm:max-w-[50vw] ">
        <Image
          src={`/assets/logo-dark.svg`}
          alt="logo light"
          width={153}
          height={26}
          priority
        />
        <p className="sm:flex sm:text-3xl md:text-5xl lg:text-6xl font-bold">
          Your Personal Task Management App
        </p>
      </div>
      <div className=" bg-[#F8F8F8] sm:max-w-fit p-5 rounded-lg space-y-4">
        <AppAuthButton variant="google" />
        <AppAuthButton variant="anonymous" />

        {/* TODO: functionalities for facebook and apple auth */}
        <button
          disabled
          className="disabled:opacity-50 flex gap-3 shadow-md rounded-md p-2 w-80 bg-[#1877F2]">
          <div className="flex items-end justify-center bg-white rounded-full w-6 h-6">
            <Image
              width={21}
              height={21}
              alt="Facebook Icon"
              src={
                "https://fdksslojrpadbebswbsg.supabase.co/storage/v1/object/public/icons/icon-facebook.png?t=2024-05-28T02%3A48%3A13.217Z"
              }
              className="bg-transparent"
            />
          </div>
          <span className=" text-white ">Continue With Facebook</span>
        </button>

        <button
          disabled
          className="disabled:opacity-50 flex gap-3 shadow-md rounded-md p-2 w-80 bg-black">
          <div className="flex items-end justify-center bg-black ">
            <Image
              width={24}
              height={24}
              alt="Apple Icon"
              src={
                "https://fdksslojrpadbebswbsg.supabase.co/storage/v1/object/public/icons/icon-apple__1_.png?t=2024-05-28T03%3A00%3A52.652Z"
              }
            />
          </div>
          <span className=" text-white">Continue With Apple</span>
        </button>
      </div>
    </div>
  );
};

export default Auth;
