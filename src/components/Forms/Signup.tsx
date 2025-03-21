import { useEffect, useState } from "react";
import useAuth from "../../utils/useAuth";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import InputWithLabel from "./InputWithLabel";
import useOnboarding from "../../hooks/useOnboarding";
import { useLanguageStore } from "../../store/languageStore";
import { toast } from "react-toastify";
import { FaTriangleExclamation } from "react-icons/fa6";

type SignupData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignupForm = () => {
  const [signupData, setSignupData] = useState<SignupData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Partial<SignupData>>({});
  const { signupUser, user } = useAuth();
  const { isOnboarded, loading } = useOnboarding(user);
  const navigate = useNavigate();
  const { t } = useLanguageStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, confirmPassword } = signupData;

    let newErrors: Partial<SignupData> = {};

    if (!email) newErrors.email = t("validationErrors.emailRequired");
    if (!password) newErrors.password = t("validationErrors.passwordRequired");
    if (!confirmPassword)
      newErrors.confirmPassword = t("validationErrors.passwordRequired");
    if (password !== confirmPassword)
      newErrors.confirmPassword = t("validationErrors.passwordMismatch");

    if (Object.entries(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const response = await signupUser({ email, password });
    if (response) {
      toast.error(response);
      return;
    } else {
      toast.success(t("auth.verificationSent"));
      return;
    }
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
      <div className="relative">
        <InputWithLabel
          label={t("register.email")}
          name="email"
          type="email"
          handleChange={handleChange}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-red-500 text-sm flex items-center mt-1">
            <FaTriangleExclamation className="mr-1" />
            {errors.email}
          </p>
        )}
      </div>

      <div className="relative">
        <InputWithLabel
          label={t("register.password")}
          name="password"
          type="password"
          handleChange={handleChange}
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && (
          <p className="text-red-500 text-sm flex items-center mt-1">
            <FaTriangleExclamation className="mr-1" />
            {errors.password}
          </p>
        )}
      </div>

      <div className="relative">
        <InputWithLabel
          label={t("register.confirmPassword")}
          name="confirmPassword"
          type="password"
          handleChange={handleChange}
          className={errors.confirmPassword ? "border-red-500" : ""}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm flex items-center mt-1">
            <FaTriangleExclamation className="mr-1" />
            {errors.confirmPassword}
          </p>
        )}
      </div>

      <Button className="w-full">{t("register.cta")}</Button>
    </form>
  );
};

export default SignupForm;
