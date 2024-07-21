import { useEffect } from "react";
import { supabaseLogout } from "../utils/supabaseLogin";
import SignupForm from "../components/Forms/Singup";

const SignupPage = () => {
  const handleLogout = () => {
    supabaseLogout();
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <section className="h-screen bg-neutral-50 dark:bg-neutral-900 grid items-center">
      <div>
        <img
          src="/logoCard.svg"
          alt="logo"
          width="50"
          height="50"
          className="mx-auto mb-5"
        />
        <div className="bg-white dark:bg-neutral-800 shadow p-10 rounded sm:w-1/2 lg:w-1/3 sm:mx-auto mx-5">
          <h1 className="text-center text-3xl font-bold font-outfit">
            Welcome
          </h1>
          <p className="text-center text-neutral-500 dark:text-neutral-400 pt-1 pb-4 text-lg">
            let's create your account
          </p>
          <SignupForm />
          <p className="mt-3">
            Already have an account?{" "}
            <a className="underline" href="/login">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
