import { useEffect, useState } from "react";
import useAuth from "../../utils/useAuth";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import InputWithLabel from "./InputWithLabel";
import useOnboarding from "../../hooks/useOnboarding";
import { useLanguageStore } from "../../store/languageStore";

type SignupData = {
  email: string;
  password: string;
};

const SignupForm = () => {
  const [loginData, setLoginData] = useState<SignupData>({} as SignupData);
  const { signupUser, error, user } = useAuth();
  const { isOnboarded, loading } = useOnboarding(user);
  const navigate = useNavigate();
  const { t } = useLanguageStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = loginData;
    e.preventDefault();
    await signupUser({ email, password });
  };

  useEffect(() => {
    if (user && !loading) {
      navigate(isOnboarded ? "/account/overview" : "/onboarding");
    }
  }, [user, isOnboarded, loading, navigate]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      aria-label="signup form"
    >
      <InputWithLabel
        label={t("register.email")}
        name="email"
        type="email"
        handleChange={handleChange}
      />
      <InputWithLabel
        label={t("register.password")}
        name="password"
        type="password"
        handleChange={handleChange}
      />
      <InputWithLabel
        label={t("register.confirmPassword")}
        name="confirm password"
        type="password"
        handleChange={handleChange}
      />
      <div className="gap-2 text-rose-700 mt-3">
        {error && <p>{error}</p>}
        <Button className="w-full">{t("register.cta")}</Button>
      </div>
    </form>
  );
};

export default SignupForm;
