import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { isOnboardingComplete } from "../utils/supabaseDB";

const useOnboarding = (user: Partial<User> | null) => {
  const [isOnboarded, setIsOnboarded] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkOnboarding = async () => {
      if (!user?.id) {
        setIsOnboarded(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      const onboarded = await isOnboardingComplete(user.id);
      setIsOnboarded(onboarded);
      setLoading(false);
    };

    checkOnboarding();
  }, [user]);

  return { isOnboarded, loading };
};

export default useOnboarding;
