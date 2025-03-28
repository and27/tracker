import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { isOnboardingComplete } from "../utils/supabaseDB";

const useOnboardingStatus = (user: Partial<User> | null) => {
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      if (!user?.id) {
        setIsOnboarded(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      const completed = await isOnboardingComplete(user.id);
      setIsOnboarded(completed);
      setLoading(false);
    };

    check();
  }, [user]);

  return { isOnboarded, loading };
};

export default useOnboardingStatus;
