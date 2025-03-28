import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { isFinancialProfileComplete } from "../utils/supabaseDB";

const useFinancialProfile = (user: Partial<User> | null) => {
  const [isCompleted, setIsCompleted] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkFinancialProfile = async () => {
      if (!user?.id) {
        setIsCompleted(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      const completed = await isFinancialProfileComplete(user.id);
      setIsCompleted(completed);
      setLoading(false);
    };

    checkFinancialProfile();
  }, [user]);

  return { isCompleted, loading };
};

export default useFinancialProfile;
