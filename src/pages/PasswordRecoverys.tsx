import { useState } from "react";
import { sendPasswordRecoveryEmail } from "../utils/supabaseLogin";

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { error } = await sendPasswordRecoveryEmail(email);
    if (error) {
      setMessage(`Error: ${error}`);
    }
  };

  return (
    <section className="h-screen bg-neutral-50 dark:bg-neutral-900 grid items-center">
      <div>
        <img
          src="/logoCard.svg"
          alt="logo"
          width="50"
          height="50"
          className="mx-auto mb-5"
        />
        <div className="bg-white dark:bg-neutral-800 shadow p-10 rounded sm:w-1/2 lg:w-1/3 sm:mx-auto mx-5">
          <h1 className="text-center text-3xl font-bold font-outfit mb-6">
            Password Recovery
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              className="bg-transparent border border-gray-300 p-2 rounded-md mt-1"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Send Password Reset Email</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </section>
  );
};

export default PasswordRecovery;
