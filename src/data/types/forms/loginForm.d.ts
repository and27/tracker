type LoginData = {
  email: string;
  password: string;
};

interface loginFormProps {
  loginUser: (user: AuthUser) => Promise<string | null>;
  loginWithGoogle: () => void;
}

type inputLabelProps = {
  label: string;
  name: string;
  type?: string;
  className?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
