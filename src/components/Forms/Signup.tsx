import { useEffect, useState } from "react";
import useAuth from "../../utils/useAuth";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import InputWithLabel from "./InputWithLabel";
import { useLanguageStore } from "../../store/languageStore";
import { toast } from "react-toastify";
import { FaTriangleExclamation } from "react-icons/fa6";
import useOnboardingStatus from "../../hooks/useOnboardingStatus";
import Spinner from "../Spinner";
import { FaGoogle } from "react-icons/fa";

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

  const { loginWithGoogle } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<SignupData>>({});
  const { signupUser, user } = useAuth();
  const { isOnboarded, loading } = useOnboardingStatus(user);
  const navigate = useNavigate();
  const { t } = useLanguageStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
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
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await signupUser({ email, password });
      if (response) {
        toast.error(response);
        return;
      }
    } catch (e) {
      console.error(e);
      toast.error(t("auth.signupError"));
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (user && !loading) {
      navigate(isOnboarded ? "/account/overview" : "/financialProfile");
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

      <Button className="w-full">
        {isSubmitting ? <Spinner size={6} height={8} /> : t("register.cta")}
      </Button>
      <button
        className="bg-neutral-800 font-bold text-white w-full flex items-center gap-3 justify-center py-2 rounded-md"
        onClick={loginWithGoogle}
        type="button"
      >
        <FaGoogle />
        {t("login.google")}
      </button>
    </form>
  );
};

export default SignupForm;
