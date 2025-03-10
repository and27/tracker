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
import { getWorkspaces } from "./supabaseDB";

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

  const getWorkspace = async (userId: string) => {
    const { data, error } = await getWorkspaces(userId);
    if (error) {
      console.error(error);
      return null;
    }

    return data?.[0];
  };

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        if (session?.user) {
          setUser(session.user);
          localStorage.setItem("userId", session.user.id);

          let workspaceId = session.user.user_metadata?.workspaceId;

          if (!workspaceId) {
            const workspace = await getWorkspace(session.user.id);
            if (workspace?.id) {
              workspaceId = workspace.id;

              await supabase.auth.updateUser({ data: { workspaceId } });
            }
          }

          if (workspaceId) {
            localStorage.setItem("workspace", workspaceId);
          }

          //verify if user is new
          const userCreatedAt = new Date(session.user.created_at);
          const now = new Date();
          const timeDifference =
            (now.getTime() - userCreatedAt.getTime()) / 1000; // diff in seconds

          if (timeDifference < 5) {
            console.log("Nuevo usuario detectado, creando perfil...");
            const { error: dbError } = await createSupabaseUser(
              session.user.id,
              session.user.email || ""
            );

            if (dbError) {
              setError(dbError.message);
            } else {
              setError(null);
            }
          }
        } else {
          setUser(null);
          localStorage.removeItem("userId");
          localStorage.removeItem("workspace");
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signupUser = async (user: AuthUser) => {
    const { email, password } = user;
    const { error } = await supabaseSignup(email, password);

    if (error) {
      if (isAuthError(error)) {
        setError(error.message);
        return null;
      }
    }
  };

  const loginUser = async (user: AuthUser) => {
    const { email, password } = user;
    const { error } = await supabaseLogin(email, password);
    if (error) {
      if (isAuthError(error)) {
        setError(error.message);
        return null;
      }
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
    localStorage.removeItem("workspace");

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
