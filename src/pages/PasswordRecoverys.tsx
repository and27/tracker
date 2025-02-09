import { useState } from "react";
import { sendPasswordRecoveryEmail } from "../utils/supabaseLogin";
import LogoImage from "../components/LogoImage";
import PasswordRecoveryForm from "../components/Forms/PasswordRecovery";
import { toast } from "react-toastify";

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await sendPasswordRecoveryEmail(email);
    toast.success("Password recovery email sent!", {
      position: "top-center",
    });
    if (error) {
      setMessage(`Error: ${error}`);
    }
  };

  return (
    <section className="h-screen bg-neutral-50 dark:bg-neutral-900 grid items-center">
      <div>
        <LogoImage />
        <div className="bg-white dark:bg-neutral-800 shadow p-10 rounded sm:w-1/2 lg:w-1/3 sm:mx-auto mx-5">
          <h1 className="text-center text-3xl font-bold font-outfit mb-6">
            Password Recovery
          </h1>
          <PasswordRecoveryForm
            handleSubmit={handleSubmit}
            email={email}
            setEmail={setEmail}
          />
          {message && <p>{message}</p>}
        </div>
      </div>
    </section>
  );
};

export default PasswordRecovery;
