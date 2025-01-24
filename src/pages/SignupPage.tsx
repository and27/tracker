import { useEffect } from "react";
import { supabaseLogout } from "../utils/supabaseLogin";
import SignupForm from "../components/Forms/Singup";
import { Link } from "react-router-dom";
import LogoImage from "../components/LogoImage";

const SignupPage = () => {
  const handleLogout = () => {
    supabaseLogout();
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <section className="min-h-screen bg-neutral-50 dark:bg-neutral-900 grid items-center">
      <div>
        <LogoImage />
        <div className="bg-white dark:bg-neutral-800 shadow p-5 mx-3 sm:p-10 md:mx-auto rounded md:w-1/2 xl:w-1/3">
          <h1 className="text-center text-3xl font-bold font-outfit">
            Welcome
          </h1>
          <p className="text-center text-neutral-500 dark:text-neutral-400 pt-1 pb-4 text-lg">
            let's create your account
          </p>
          <SignupForm />
          <p className="mt-3">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 dark:text-indigo-400">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignupPage;
