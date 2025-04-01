import { useEffect, useState } from "react";
import {
  createSupabaseUser,
  googleLogin,
  supabaseLogin,
  supabaseSignup,
} from "./supabaseLogin";
import { AuthError, User } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import { useInsightStore } from "../store/insightStore";
import { useTransactionStore } from "../store/transactionStore";
import { useNavigate } from "react-router-dom";
import { getWorkspaces } from "./supabaseDB";
import { useLanguageStore } from "../store/languageStore";
import { useCategoriesStore } from "../store/categoriesStore";

type AuthUser = {
  email: string;
  password: string;
};

const isAuthError = (error: unknown): error is AuthError => {
  return (error as AuthError).message !== undefined;
};

const useAuth = () => {
  const [user, setUser] = useState<Partial<User> | null>(null);
  const navigate = useNavigate();
  const { t } = useLanguageStore();

  const clearGlobalState = () => {
    useTransactionStore.getState().clearTransactions();
    useInsightStore.getState().clearInsights();
    useCategoriesStore.getState().clearCategories();
  };

  const handleDatabaseError = (errorCode: string) => {
    if (!errorCode) return null;

    switch (errorCode) {
      case "23505":
        return t("dbAndStorageErrors.duplicateEntry");
      case "23503":
        return t("dbAndStorageErrors.foreignKeyViolation");
      case "23502":
        return t("dbAndStorageErrors.notNullViolation");
      case "42601":
        return t("dbAndStorageErrors.syntaxError");
      case "42703":
        return t("dbAndStorageErrors.undefinedColumn");
      case "42P01":
        return t("dbAndStorageErrors.undefinedTable");
      case "504":
        return t("dbAndStorageErrors.databaseTimeout");
      case "403":
        return t("dbAndStorageErrors.accessDenied");
      default:
        return t("dbAndStorageErrors.databaseError");
    }
  };

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

          // Verificar si el usuario es nuevo
          const userCreatedAt = new Date(session.user.created_at);
          const now = new Date();
          const timeDifference =
            (now.getTime() - userCreatedAt.getTime()) / 1000;

          if (timeDifference < 10) {
            await createSupabaseUser(session.user.id, session.user.email || "");
          }
        } else {
          setUser(null);
          localStorage.removeItem("userId");
          localStorage.removeItem("workspace");
          clearGlobalState();
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signupUser = async (user: AuthUser): Promise<string | null> => {
    const { email, password } = user;
    const { data, error } = await supabaseSignup(email, password);
    if (error && isAuthError(error)) {
      return t(`authErrors.${error.code}`, { defaultValue: error.message });
    }

    if (data?.user) {
      const { error: dbError } = await createSupabaseUser(
        data.user.id,
        data.user.email || ""
      );
      if (dbError) {
        const errorMessage = handleDatabaseError(dbError.code);
        return errorMessage || t("dbAndStorageErrors.database_error");
      }
    }

    return null;
  };

  const loginUser = async (user: AuthUser): Promise<string | null> => {
    const { email, password } = user;
    const { error } = await supabaseLogin(email, password);

    if (error && isAuthError(error)) {
      return t(`authErrors.${error.code}`, { defaultValue: error.message });
    }

    return null; // No hay errores
  };

  const loginWithGoogle = async (): Promise<string | null> => {
    const { error } = await googleLogin();
    if (error && isAuthError(error)) {
      return t(`authErrors.${error.code}`, { defaultValue: error.message });
    }
    return null;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error && isAuthError(error)) {
      console.error("Error logging out:", error.message);
      return;
    }
    localStorage.removeItem("userId");
    localStorage.removeItem("workspace");

    clearGlobalState();

    setUser(null);
    navigate("/login", { replace: true });
  };

  return {
    user,
    loginUser,
    signupUser,
    loginWithGoogle,
    logout,
  };
};

export default useAuth;
