import { useEffect } from "react";
import LoginForm from "../components/Forms/LoginForm";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../utils/useAuth";

const LoginPage = () => {
  const { loginUser, error, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userId");
  };

  useEffect(() => {
    handleLogout();
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/account/overview");
    }
  }, [user]);

  return (
    <section className="min-h-screen bg-neutral-50 dark:bg-neutral-900 grid items-center">
      <div>
        <img
          src="/logoCard.svg"
          alt="logo"
          width="50"
          height="50"
          className="mx-auto mb-5 size-[2rem] lg:size-[3rem] filter brightness-75 dark:brightness-100"
        />
        <div className="bg-white dark:bg-neutral-800 shadow p-5 mx-3 sm:p-10 md:mx-auto rounded md:w-1/2 xl:w-1/3">
          <h1 className="text-center text-3xl font-bold font-outfit">
            Sign in
          </h1>
          <p className="text-center text-neutral-500 dark:text-neutral-400 pt-1 pb-4 text-lg">
            to continue to Tracker
          </p>
          <LoginForm loginError={error} loginUser={loginUser} />
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
