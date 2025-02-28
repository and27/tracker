import { supabase } from "./supabase";

export type AuthError = {
  message: string;
};

// const localURL = "http://localhost:5173";
const prodURL = "https://tracker-ulqw.vercel.app";
const BASE_URL = prodURL;

const googleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: window.location.origin + "/account/overview",
    },
  });

  if (error) {
    console.error("Error al iniciar sesión con Google:", error);
    return { data: null, error };
  }

  return { data: data, error: null };
};

const supabaseLogin = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  return { data, error };
};

const supabaseSignup = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  return { data: data, error: error };
};

const createSupabaseUser = async (uid: string, email: string) => {
  const { data, error } = await supabase.from("user_profile").insert({
    user_id: uid,
    email: email,
  });

  return { data, error };
};

const supabaseLogout = () => {
  supabase.auth.signOut();
};

const resetPassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  return { data, error };
};

const sendPasswordRecoveryEmail = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${BASE_URL}/reset-password`,
  });
  return { data, error };
};

export {
  supabaseLogin,
  googleLogin,
  supabaseSignup,
  supabaseLogout,
  createSupabaseUser,
  resetPassword,
  sendPasswordRecoveryEmail,
};
