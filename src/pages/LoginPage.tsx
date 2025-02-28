import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/Forms/LoginForm";
import useAuth from "../utils/useAuth";
import LogoImage from "../components/LogoImage";
import useOnboarding from "../hooks/useOnboarding";

const LoginPage = () => {
  const { loginWithGoogle, loginUser, error, user } = useAuth();
  const { isOnboarded, loading } = useOnboarding(user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading && isOnboarded !== null) {
      navigate(isOnboarded ? "/account/overview" : "/onboarding");
    }
  }, [user, isOnboarded, loading, navigate]);

  return (
    <section className="min-h-screen bg-neutral-50 dark:bg-neutral-900 grid items-center">
      <div>
        <div className="flex flex-col justify-center bg-white dark:bg-transparent shadow p-5 mx-3 sm:p-10 md:mx-auto rounded md:w-1/2 xl:w-1/3">
          <Link to="/" className="flex gap-3 justify-center items-center mb-7">
            <LogoImage />
            <div>
              <h1 className="text-3xl font-bold font-outfit">Sign in</h1>
              <p className="text-neutral-500 dark:text-neutral-400 text-lg leading-none">
                to continue to Tracker
              </p>
            </div>
          </Link>
          <LoginForm
            loginError={error}
            loginUser={loginUser}
            loginWithGoogle={loginWithGoogle}
          />
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
