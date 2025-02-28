type LoginData = {
  email: string;
  password: string;
};

interface loginFormProps {
  loginUser: (user: LoginData) => void;
  loginError: string | null;
  loginWithGoogle: () => void;
}

type inputLabelProps = {
  label: string;
  name: string;
  type?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
