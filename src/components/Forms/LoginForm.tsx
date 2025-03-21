import { useState } from "react";
import Button from "../Button";
import InputWithLabel from "./InputWithLabel";
import { FaGoogle, FaTriangleExclamation } from "react-icons/fa6";
import { useLanguageStore } from "../../store/languageStore";
import { toast } from "react-toastify";

const LoginForm: React.FC<loginFormProps> = ({
  loginUser,
  loginWithGoogle,
}) => {
  const [loginData, setLoginData] = useState<LoginData>({} as LoginData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const { t } = useLanguageStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({}); //clean previous errors

    const { email, password } = loginData;

    let newErrors: { email?: string; password?: string } = {};
    if (!email) newErrors.email = t("validationErrors.emailRequired");
    if (!password) newErrors.password = t("validationErrors.passwordRequired");

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsSubmitting(false);
      return;
    }

    const errorMessage = await loginUser({ email, password });
    if (errorMessage) {
      toast.error(errorMessage);
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="relative">
        <InputWithLabel
          label={t("login.email")}
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
          label={t("login.password")}
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

      <Button className="w-full" disabled={isSubmitting}>
        {isSubmitting ? t("login.loading") : t("login.cta")}
      </Button>

      <button
        className="bg-neutral-800 font-bold text-white w-full flex items-center gap-3 justify-center py-2 rounded-md"
        onClick={loginWithGoogle}
      >
        <FaGoogle />
        {t("login.google")}
      </button>
    </form>
  );
};

export default LoginForm;
