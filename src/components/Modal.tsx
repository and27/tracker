import { FocusTrap } from "focus-trap-react";
import { useEffect, useRef } from "react";
import { FaTimes } from "react-icons/fa";

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Modal = ({ children, isOpen, onClose, title }: ModalProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (isOpen && titleRef.current) {
      titleRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  if (isOpen)
    return (
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 
          flex justify-center items-center `}
      >
        <FocusTrap
          active={isOpen}
          focusTrapOptions={{
            escapeDeactivates: true,
            clickOutsideDeactivates: true,
            onDeactivate: onClose, //it only works on production due to StrictMode double rendering
          }}
        >
          <div
            className={`p-7 flex flex-col gap-8 bg-neutral-100 dark:bg-neutral-800 w-96 min-h-32 rounded-lg shadow-lg`}
          >
            <div
              className="flex items-center justify-between
              border-b border-neutral-200 dark:border-neutral-700 pb-2"
            >
              <h2 tabIndex={-1} ref={titleRef}>
                {title}
              </h2>
              <button className="bg-transparent p-2" onClick={onClose}>
                <FaTimes />
              </button>
            </div>
            {children}
          </div>
        </FocusTrap>
      </div>
    );
};

export default Modal;
