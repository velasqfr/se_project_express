import "./DeleteConfirmationModal.css";

import close from "../../assets/close.png";

function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  return (
    <div className={`modal ${isOpen ? " modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_confirm">
        <button type="button" className="modal__close" onClick={onClose}>
          <img src={close} alt="Close modal" className="close__modal-icon" />
        </button>

        <div className="">
          <h2 className="modal__confirm-text">
            Are you sure you want to delete this item?
          </h2>
          <p className="modal__delete-text">This action is irreversible</p>
        </div>

        <div className="modal__delete-action">
          <button
            type="button"
            className="delete__modal-btn"
            onClick={onConfirm}
          >
            Yes, delete
          </button>
          <button type="button" className="cancel__modal-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
