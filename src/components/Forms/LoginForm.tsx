import { useState } from "react";
import Button from "../Button";
import InputWithLabel from "./InputWithLabel";
import { FaGoogle } from "react-icons/fa6";

const LoginForm: React.FC<loginFormProps> = ({
  loginUser,
  loginError,
  loginWithGoogle,
}) => {
  const [loginData, setLoginData] = useState<LoginData>({} as LoginData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = loginData;
    e.preventDefault();
    await loginUser({ email, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="login form"
      className="flex flex-col gap-4"
    >
      <InputWithLabel
        label="Email"
        name="email"
        type="email"
        handleChange={handleChange}
      />
      <InputWithLabel
        label="Password"
        name="password"
        type="password"
        handleChange={handleChange}
      />
      <div className="gap-2 text-rose-700 mt-3">
        {loginError && <p>{loginError}</p>}
        <Button className="w-full">Login</Button>
        <button
          className="bg-neutral-800 font-bold text-white mt-5 w-full flex items-center gap-3 justify-center py-2 rounded-md"
          onClick={loginWithGoogle}
        >
          <FaGoogle /> Login with Google
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
