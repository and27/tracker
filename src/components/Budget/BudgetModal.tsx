import Modal from "../Modals/Modal";
import CategoryForm from "../Forms/CategoryForm";

type BudgetModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: any) => void;
  currentCategory?: any;
  type: "add" | "edit";
};

const BudgetModal = ({
  isOpen,
  onClose,
  onSave,
  currentCategory,
  type,
}: BudgetModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={type === "add" ? "Agregar categoría" : "Editar categoría"}
    >
      <CategoryForm
        type={type}
        currentCategory={currentCategory}
        handleAction={onSave}
      />
    </Modal>
  );
};

export default BudgetModal;
