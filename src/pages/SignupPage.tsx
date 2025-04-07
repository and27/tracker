import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLanguageStore } from "../store/languageStore";
import { supabaseLogout } from "../utils/supabaseLogin";
import SignupForm from "../components/Forms/Signup";
import LogoImage from "../components/LogoImage";
import LanguageSwitcher from "../components/LanguageSwitcher";
import useAuth from "../utils/useAuth";
import ProfileCard from "../components/Cards/ProfileCard";

type StoredProfile = {
  profile: string;
};

const SignupPage = () => {
  const [localProfileResult, setLocalProfileResult] =
    useState<StoredProfile | null>(null);
  const { user } = useAuth();
  const { t } = useLanguageStore();

  const handleLogout = () => {
    supabaseLogout();
  };

  useEffect(() => {
    handleLogout(); // Ensures no user session is active
  }, []);

  useEffect(() => {
    if (!user) {
      const savedProfile = localStorage.getItem("financialProfileResult");
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile);
          if (parsed.profile) {
            setLocalProfileResult(parsed);
          }
        } catch (e) {
          console.error("Invalid profile data in localStorage");
        }
      }
    }
  }, [user]);

  const translatedProfile = localProfileResult
    ? {
        profile: localProfileResult.profile,
        friendly_name: t(
          `financialProfile.profiles.${localProfileResult.profile}.friendly_name`
        ),
        description: t(
          `financialProfile.profiles.${localProfileResult.profile}.description`
        ),
      }
    : null;

  return (
    <section className="relative min-h-screen bg-neutral-50 dark:bg-neutral-900 grid items-center">
      <div className="absolute top-5 right-5">
        <LanguageSwitcher />
      </div>

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

        {translatedProfile && <ProfileCard profileData={translatedProfile} />}

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
