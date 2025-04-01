import { useState, useEffect } from "react";
import { isFinancialProfileComplete } from "../utils/supabaseDB";
import useAuth from "../utils/useAuth";

const useFinancialProfile = () => {
  const [isCompleted, setIsCompleted] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

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
