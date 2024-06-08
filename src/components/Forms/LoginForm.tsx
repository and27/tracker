import { useEffect, useState } from "react";
import useAuth from "../../utils/useAuth";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

type LoginData = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const [loginData, setLoginData] = useState<LoginData>({} as LoginData);
  const { loginUser, error, user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const { email, password } = loginData;
    e.preventDefault();
    await loginUser({ email, password });
  };

  useEffect(() => {
    if (user) {
      navigate("/overview");
    }
  }, [user]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

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
          type="password"
          name="password"
          onChange={handleChange}
        />
      </label>
      <div className="flex gap-2">
        <Button>Login</Button>
        {error && <p>{error}</p>}
      </div>
    </form>
  );
};

export default LoginForm;
