import { useEffect, useState } from "react";
import useAuth from "../../utils/useAuth";
import Button from "../Button";
import { useNavigate } from "react-router-dom";
import InputWithLabel from "./InputWithLabel";

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

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
      aria-label="signup form"
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
      <InputWithLabel
        label="Confirm Password"
        name="confirm password"
        type="password"
        handleChange={handleChange}
      />
      <div className="gap-2 text-rose-700">
        {error && <p>{error}</p>}
        <Button>Sign up</Button>
      </div>
    </form>
  );
};

export default SignupForm;
