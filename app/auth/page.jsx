import { login } from "./actions";
import { redirect } from "next/navigation";
import { supabaseServer } from "../utils/supabase/server";
const Auth = async () => {
  const supabase = supabaseServer();
  const { data, error } = await supabase.auth.getUser();
  if (data?.user && !error) {
    redirect("/dashboard");
  }
  return (
    <div>
      {/* <Button
        onClick={() => handleLoginWithOAuth("google")}
        className="border rounded-md">
        Google SignIn
      </Button> */}
      <form action={login}>
        <button>Sign in With Google</button>
      </form>
    </div>
  );
};

export default Auth;
