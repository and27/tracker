import { useEffect, useState } from "react";
import {
  AuthError,
  createSupabaseUser,
  googleLogin,
  supabaseLogin,
  supabaseSignup,
} from "./supabaseLogin";
import { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { useInsightStore } from "../store/insightStore";
import { useTransactionStore } from "../store/transactionStore";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        if (session?.user) {
          setUser(session.user);
          localStorage.setItem("userId", session.user.id);

          const { error: dbError } = await createSupabaseUser(
            session.user.id,
            session.user.email || ""
          );

          if (dbError) {
            setError(dbError.message);
          } else {
            setError(null);
          }
        } else {
          setUser(null);
          localStorage.removeItem("userId");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

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

  const loginWithGoogle = async () => {
    const { error } = await googleLogin();
    if (error) {
      setError(error.message);
      return;
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
      return;
    }

    localStorage.removeItem("userId");
    useInsightStore.getState().clearInsights();
    useTransactionStore.getState().clearTransactions();

    setUser(null);
    navigate("/login", { replace: true });
  };

  return {
    user,
    error,
    loginUser,
    signupUser,
    loginWithGoogle,
    logout,
  };
};

export default useAuth;
