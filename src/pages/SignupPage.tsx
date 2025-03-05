import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguageStore } from "../store/languageStore";
import { supabaseLogout } from "../utils/supabaseLogin";
import SignupForm from "../components/Forms/Signup";
import LogoImage from "../components/LogoImage";
import LanguageSwitcher from "../components/LanguageSwitcher";

const SignupPage = () => {
  const { t } = useLanguageStore();
  const handleLogout = () => {
    supabaseLogout();
  };

  useEffect(() => {
    handleLogout();
  }, []);

  return (
    <section className="relative min-h-screen bg-neutral-50 dark:bg-neutral-900 grid items-center">
      <LanguageSwitcher />
      <div className="flex flex-col justify-center bg-white dark:bg-transparent shadow p-5 mx-3 sm:p-10 md:mx-auto rounded md:w-1/2 xl:w-1/3">
        <Link to="/" className="flex gap-3 justify-center items-center mb-7">
          <LogoImage />
          <div>
            <h1 className="text-3xl font-bold font-outfit">
              {t("register.title")}
            </h1>
            <p className="text-neutral-500 dark:text-neutral-400 leading-none text-lg">
              {t("register.subtitle")}
            </p>
          </div>
        </Link>
        <SignupForm />
        <p className="mt-3">
          {t("register.login")}
          <Link
            to="/login"
            className="ml-2 text-indigo-600 dark:text-indigo-400"
          >
            {t("register.loginLink")}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default SignupPage;
