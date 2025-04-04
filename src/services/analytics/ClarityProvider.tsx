import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

const projectId = "qxkfk4d9iu";

const ClarityProvider = () => {
  useEffect(() => {
    if (import.meta.env.MODE === "production") {
      Clarity.init(projectId);
      const userId = localStorage.getItem("userId");
      if (userId) {
        Clarity.identify(userId);
      }
    }
  }, []);

  return null;
};

export default ClarityProvider;
