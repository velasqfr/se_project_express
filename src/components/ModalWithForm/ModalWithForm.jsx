import "./ModalWithForm.css";
import close from "../../assets/close.png";
import useModalClose from "../../hooks/useModalClose";

function ModalWithForm({
  children,
  buttonText = "save",
  title,
  isOpen,
  onClose,
  onSubmit,
  isButtonDisabled,
  isFormValid,
  switchButton,
  submitEditButton,
  modalContentClassName,
}) {
  useModalClose(isOpen, onClose);
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className={`modal__content ${modalContentClassName || ""}`}>
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close modal" />
        </button>

        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <div className="modal__action">
            <button
              type="submit"
              className={`modal__submit ${submitEditButton} ${
                isFormValid ? "active" : ""
              }`}
              disabled={isButtonDisabled}
            >
              {buttonText}
            </button>
            {switchButton && (
              <div className="modal__switch">{switchButton}</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;

/*htmlFor should match the ID number */

/*if activeModal is an empty string it'll be falsy so if it equals add-garment then we'll apply the class "modal__opened" */
/*{onClose} is added from App.js to close the button, add the onClick handler is then added to the button */
