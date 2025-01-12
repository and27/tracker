import { useState } from "react";
import Button from "../Button";

type LoginData = {
  email: string;
  password: string;
};
interface loginFormProps {
  loginUser: (user: LoginData) => void;
  loginError: string | null;
}

const LoginForm: React.FC<loginFormProps> = ({ loginUser, loginError }) => {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label
        htmlFor="email"
        className="flex flex-col text-gray-700 dark:text-neutral-200 font-semibold text-lg"
      >
        Email
        <input
          className="bg-transparent border border-gray-300 p-2 rounded-md mt-1"
          type="email"
          name="email"
          onChange={handleChange}
        />
      </label>
      <label
        htmlFor="password"
        className="flex flex-col text-gray-700 dark:text-neutral-200 font-semibold text-lg"
      >
        Password
        <input
          className="bg-transparent border border-gray-300 p-2 rounded-md mt-1"
          type="password"
          name="password"
          onChange={handleChange}
        />
      </label>
      <div className="gap-2 text-rose-700">
        {loginError && <p>{loginError}</p>}
        <Button>Login</Button>
      </div>
    </form>
  );
};

export default LoginForm;
