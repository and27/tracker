import Button from "../Button";
import LinkButton from "../LinkButton";

interface PasswordRecoveryProps {
  email: string;
  setEmail: (email: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const PasswordRecoveryForm = ({
  email,
  setEmail,
  handleSubmit,
}: PasswordRecoveryProps) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2"
      aria-label="password recovery form"
    >
      <label
        htmlFor="email"
        className="flex flex-col text-neutral-700 dark:text-neutral-200"
      >
        Email
        <input
          className="bg-transparent border border-gray-300 p-2 rounded-md mt-1"
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <div className="flex gap-4 justify-start mt-5">
        <LinkButton to="/login" className="secondary">
          <span className="text-center text-neutral-500 dark:text-neutral-400 pt-1 pb-4 text-lg">
            Back to login
          </span>
        </LinkButton>
        <Button type="submit">Send Password Reset Email</Button>
      </div>
    </form>
  );
};

export default PasswordRecoveryForm;
