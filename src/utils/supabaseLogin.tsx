import { supabase } from "./supabase";

export type AuthError = {
  message: string;
};

// const localURL = "http://localhost:5173";
const prodURL = "https://tracker-ulqw.vercel.app";
const BASE_URL = prodURL;

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
  const { data, error } = await supabase.from("user").insert({
    id: uid,
    email,
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
  supabaseSignup,
  supabaseLogout,
  createSupabaseUser,
  resetPassword,
  sendPasswordRecoveryEmail,
};
