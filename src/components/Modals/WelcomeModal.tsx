import { useState, useEffect } from "react";
import Modal from "./Modal";

const WelcomeModal = ({ userId }: { userId: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!userId) return null;

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem(`has_seen_welcome_${userId}`);

    if (!hasSeenWelcome) {
      setIsOpen(true);
      localStorage.setItem(`has_seen_welcome_${userId}`, "true");
    }
  }, [userId]);

  const handleClose = () => setIsOpen(false);

  return (
    <Modal title="¡Bienvenido!" isOpen={isOpen} onClose={handleClose}>
      <h1 className="text-xl font-semibold">
        ¡Tu viaje hacia la libertad financiera comienza ahora! 🚀
      </h1>
      <p className="">
        Estás a punto de descubrir cómo mejorar tus finanzas personales.
      </p>
      <div className="mt-4 flex justify-end">
        <button
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          onClick={() => setIsOpen(false)}
        >
          Estoy listo
        </button>
      </div>
    </Modal>
  );
};

export default WelcomeModal;
