import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useInsightStore } from "../store/insightStore";
import { useTransactionStore } from "../store/transactionStore";
// import { useAuthStore } from "../store/authStore";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    useInsightStore.getState().clearInsights();
    useTransactionStore.getState().clearTransactions();
    localStorage.removeItem("userId");
    navigate("/login", { replace: true });
  }, []);

  return null;
};

export default LogoutPage;
