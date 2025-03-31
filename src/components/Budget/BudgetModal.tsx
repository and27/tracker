import Modal from "../Modals/Modal";
import CategoryForm from "../Forms/CategoryForm";

const BudgetModal = ({ isOpen, onClose, onSave, currentCategory, type }) => {
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
