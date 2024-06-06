import { useState } from "react";
import LinkButton from "../LinkButton";

type LoginData = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const [loginData, setLoginData] = useState<LoginData>({} as LoginData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(loginData);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <label
        htmlFor="email"
        className="flex flex-col text-gray-700 
      font-semibold text-lg"
      >
        Email
        <input
          className="border border-gray-300 p-2 rounded-md mt-1"
          type="email"
          name="email"
          onChange={handleChange}
        />
      </label>
      <label
        htmlFor="password"
        className="flex flex-col text-gray-700
            font-semibold text-lg"
      >
        Password
        <input
          className="border border-gray-300 p-2 rounded-md mt-1"
          type="text"
          name="password"
          onChange={handleChange}
        />
      </label>
      <div className="flex gap-2">
        <LinkButton to="/overview">Login</LinkButton>
      </div>
    </form>
  );
};

export default LoginForm;
