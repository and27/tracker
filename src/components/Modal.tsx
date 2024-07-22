import { FaTimes } from "react-icons/fa";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

const Modal = ({ children, isOpen, onClose, title }: ModalProps) => {
  if (isOpen)
    return (
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center`}
      >
        <div
          className={`flex flex-col gap-8 bg-neutral-100 dark:bg-neutral-800 w-96 min-h-32 p-4 rounded-lg shadow-lg`}
        >
          <div className="flex items-start justify-between">
            <h2>{title}</h2>
            <button
              className="focus:outline-none bg-transparent p-2"
              onClick={onClose}
            >
              <FaTimes />
            </button>
          </div>
          {children}
        </div>
      </div>
    );
};

export default Modal;
