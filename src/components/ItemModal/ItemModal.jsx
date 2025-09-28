import { useContext } from "react";
import "./ItemModal.css";
import close from "../../assets/close.png";
import useModalClose from "../../hooks/useModalClose";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, onClose, card, onDeleteClick }) {
  // Hook to handle ESC key and overlay click only when modal is open
  useModalClose(activeModal === "preview", onClose);

  //This gives us information about the user who is currently logged in, like their unique ID (_id), name, avatar, etc.
  const currentUser = useContext(CurrentUserContext);
  if (!card) return null;

  // Checking if the current user is the owner of the current clothing item
  //If they match, it means the item was created/owned by the current user.
  //The variable isOwn will be true if the logged-in user owns the item, otherwise false
  const isOwn = card.owner === currentUser._id;

  return (
    <div className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}>
      <div className="modal__content modal__content_type_image">
        <button onClick={onClose} type="button" className="modal__close">
          <img src={close} alt="close modal" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather} </p>
        </div>
        {isOwn && (
          <button
            type="button"
            className="item__delete-btn"
            onClick={() => onDeleteClick(card)}
          >
            Delete Item
          </button>
        )}
      </div>
    </div>
  );
}
export default ItemModal;

/*if activeModal equals "preview" then we'll apply the class "modal_opened" */
/* it is card.imageUrl because of what it is being called 'card' */
