import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginForm from "../components/Forms/LoginForm";
import useAuth from "../utils/useAuth";
import LogoImage from "../components/LogoImage";
import { useLanguageStore } from "../store/languageStore";
import LanguageSwitcher from "../components/LanguageSwitcher";
import useOnboardingStatus from "../hooks/useOnboardingStatus";

const LoginPage = () => {
  const { loginWithGoogle, loginUser, user } = useAuth();
  const { isOnboarded, loading } = useOnboardingStatus(user);
  const navigate = useNavigate();
  const { t } = useLanguageStore();

  useEffect(() => {
    if (user && !loading && isOnboarded !== null) {
      navigate(isOnboarded ? "/account/overview" : "/financialProfile");
    }
  }, [user, isOnboarded, loading, navigate]);

  return (
    <section className="relative min-h-screen bg-neutral-50 dark:bg-neutral-900 grid items-center">
      <div className="absolute top-5 right-5">
        <LanguageSwitcher />
      </div>
      <div>
        <div className="flex flex-col justify-start bg-white dark:bg-transparent shadow p-5 mx-3 sm:p-10 md:mx-auto rounded md:w-1/2 xl:w-1/3">
          <Link to="/" className="flex flex-col gap-2 justify-start mb-7">
            <div className="flex items-center gap-3">
              <LogoImage />
              <h1 className="text-3xl font-bold font-outfit">
                {t("login.title")}
              </h1>
            </div>
            <p className="text-neutral-500 dark:text-neutral-400 text-lg leading-none">
              {t("login.subtitle")}
            </p>
          </Link>
          <LoginForm loginUser={loginUser} loginWithGoogle={loginWithGoogle} />
          <p className="mt-3">
            <Link
              to="/password-recovery"
              className="text-indigo-600 dark:text-indigo-400"
            >
              {t("login.forgotPassword")}
            </Link>
          </p>
          <p className="mt-3">
            {t("login.noAccount")}
            <Link
              to="/signup"
              className="ml-1 text-indigo-600 dark:text-indigo-400"
            >
              {t("login.register")}
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
