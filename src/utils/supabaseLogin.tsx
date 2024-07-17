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

const supabaseSignup = () => {
  supabase.auth
    .signUp({
      email: "",
      password: "",
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
};

const supabaseLogout = () => {
  supabase.auth.signOut();
};

export { supabaseLogin, supabaseSignup, supabaseLogout };
