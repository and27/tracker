import { resetPassword } from "../../utils/supabaseLogin";

const PasswordResetForm = () => {
  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPassword = e.currentTarget.password.value;
    const { data, error } = await resetPassword(newPassword);
    console.log(data, error);
  };

  return (
    <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
      <input
        className="bg-transparent border border-gray-300 p-2 rounded-md mt-1"
        type="password"
        placeholder="Password"
        name="password"
      />
      <button type="submit">Create new password</button>
    </form>
  );
};

export default PasswordResetForm;
