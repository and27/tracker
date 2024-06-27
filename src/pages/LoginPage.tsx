import LoginForm from "../components/Forms/LoginForm";

const LoginPage = () => {
  return (
    <>
      <img
        src="/logoCard.svg"
        alt="logo"
        width="50"
        height="50"
        className="mx-auto mb-5"
      />
      <div
        className="bg-white dark:bg-neutral-800 shadow 
    p-10 rounded w-1/2 sm:w-1/3 mx-auto "
      >
        <h1 className="text-center text-3xl font-bold font-outfit">Sign in</h1>
        <p className="text-center text-neutral-500  dark:text-neutral-400 pt-1 pb-4 text-lg">
          to continue to Tracker
        </p>
        <LoginForm />
      </div>
    </>
  );
};

export default LoginPage;
