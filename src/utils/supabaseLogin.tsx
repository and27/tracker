import { supabase } from "./supabase";

export type AuthError = {
  message: string;
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

const supabaseLogout = () => {
  supabase.auth.signOut();
};

export { supabaseLogin, supabaseSignup, supabaseLogout };
