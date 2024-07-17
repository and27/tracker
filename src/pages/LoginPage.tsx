import { useEffect } from "react";
import LoginForm from "../components/Forms/LoginForm";
import { supabaseLogout } from "../utils/supabaseLogin";

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
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
