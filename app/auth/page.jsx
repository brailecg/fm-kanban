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
        <p className="text-red-500 text-xs">Supabase backend service has expired.</p> 
        <p className="text-red-500 text-xs">Subscribe for database access</p>
      </div>
    </div>
  );
};

export default Auth;
