import { useState } from "react";
import {
  AuthError,
  createSupabaseUser,
  supabaseLogin,
  supabaseSignup,
} from "./supabaseLogin";
import { User } from "@supabase/supabase-js";

type AuthUser = {
  email: string;
  password: string;
};

const isAuthError = (error: unknown): error is AuthError => {
  return (error as AuthError).message !== undefined;
};

const useAuth = () => {
  //todo: interact with db, define User interface and use User instead of Partial<User>
  const [user, setUser] = useState<Partial<User> | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loginUser = async (user: AuthUser) => {
    const { email, password } = user;
    const { data, error } = await supabaseLogin(email, password);
    if (error) {
      if (isAuthError(error)) {
        setError(error.message);
        return null;
      }
    } else if (data?.user) {
      setUser(data.user);
      localStorage.setItem("userId", data.user.id);
      createSupabaseUser(data.user.id, email);
      setError(null);
    }
  };

  const signupUser = async (user: AuthUser) => {
    const { email, password } = user;
    const { data, error } = await supabaseSignup(email, password);

    if (error) {
      if (isAuthError(error)) {
        setError(error.message);
        return null;
      }
    } else if (data?.user) {
      setUser(data.user);
      localStorage.setItem("userId", data.user.id);
      createSupabaseUser(data.user.id, email);
      setError(null);
    }
  };

  return {
    user,
    error,
    loginUser,
    signupUser,
  };
};

export default useAuth;
