import PasswordResetForm from "../components/Forms/PasswordResetForm";
import LogoImage from "../components/LogoImage";

const PasswordReset = () => {
  return (
    <section className="h-screen bg-neutral-50 dark:bg-neutral-900 grid items-center">
      <div>
        <LogoImage />
        <div className="bg-white dark:bg-neutral-800 shadow p-10 rounded sm:w-1/2 lg:w-1/3 sm:mx-auto mx-5">
          <h1 className="text-center text-3xl font-bold font-outfit">
            New Password
          </h1>
          <p className="text-center text-neutral-500 dark:text-neutral-400 pt-1 pb-4 text-lg">
            Enter your new password
          </p>
          <PasswordResetForm />
        </div>
      </div>
    </section>
  );
};

export default PasswordReset;
