import { useEffect, useState } from "react";
import useAuth from "../../utils/useAuth";
import Button from "../Button";
import { useNavigate } from "react-router-dom";

type SignupData = {
  email: string;
  password: string;
};

const SignupForm = () => {
  const [loginData, setLoginData] = useState<SignupData>({} as SignupData);
  const { signupUser, error, user } = useAuth();
  const navigate = useNavigate();

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
    if (user) {
      navigate("/account/overview");
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
      <label
        htmlFor="password"
        className="flex flex-col text-gray-700 dark:text-neutral-200 font-semibold text-lg"
      >
        Confirm Password
        <input
          className="bg-transparent border border-gray-300 p-2 rounded-md mt-1"
          type="password"
          name="password"
          onChange={handleChange}
        />
      </label>
      <div className="gap-2 text-rose-700">
        {error && <p>{error}</p>}
        <Button>Sign up</Button>
      </div>
    </form>
  );
};

export default SignupForm;
