import { useEffect } from "react";
import { loadSpace } from "@usersnap/browser";

const USERSNAP_PROJECT_API_KEY = import.meta.env.VITE_USERSNAP;

const UsersnapWidget = () => {
  useEffect(() => {
    loadSpace(USERSNAP_PROJECT_API_KEY)
      .then((api) => {
        api.init();
      })
      .catch((error) => console.error("Error cargando Usersnap:", error));
  }, []);

  return null;
};

export default UsersnapWidget;
