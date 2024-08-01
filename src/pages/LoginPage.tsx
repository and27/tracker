import { useEffect } from "react";
import LoginForm from "../components/Forms/LoginForm";
import { supabaseLogout } from "../utils/supabaseLogin";
import { Link } from "react-router-dom";

const LoginPage = () => {
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
            Sign in
          </h1>
          <p className="text-center text-neutral-500 dark:text-neutral-400 pt-1 pb-4 text-lg">
            to continue to Tracker
          </p>
          <LoginForm />
          <p className="mt-3">
            <Link
              to="/password-recovery"
              className="text-indigo-600 dark:text-indigo-400"
            >
              Forgot my password
            </Link>
          </p>
          <p className="mt-3">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 dark:text-indigo-400">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
