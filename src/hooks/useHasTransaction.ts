import { useEffect, useState } from "react";
import useAuth from "../utils/useAuth";
import { supabase } from "../utils/supabase";

const useHasTransaction = () => {
  const { user } = useAuth();
  const [hasTransaction, setHasTransaction] = useState<boolean>(false);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from("transaction")
        .select("id")
        .eq("user_id", user.id)
        .limit(1);

      if (error) {
        console.error("Error fetching transactions:", error);
        return;
      }

      setHasTransaction(data && data.length > 0);
    };

    fetchTransactions();
  }, [user?.id]);

  return hasTransaction;
};

export default useHasTransaction;
