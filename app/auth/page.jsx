import { login } from "./actions";

const Auth = () => {
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
