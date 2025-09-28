//Modal that lets the user update their name and avatar URL.
import { useState, useEffect, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function EditProfileModal({ isOpen, onClose, onSubmit }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); //start not submitting

  useEffect(() => {
    if (currentUser && isOpen) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
      //This fills the form with the current user's data (avatar & name) when the modal opens
      // ||"" -> in case name or avatar is undefined, we don’t want to break the form
    }
  }, [currentUser, isOpen]);

  //function that runs when users clicks the "save" button
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true); //start submission

    return onSubmit({ name, avatar }).finally(() => {
      setIsSubmitting(false); //done submitting
    });
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Change Profile Data"
      buttonText={isSubmitting ? "Saving..." : "Save"}
      isButtonDisabled={isSubmitting || !name.trim()}
      submitEditButton="modal__edit-btn"
      modalContentClassName="modal__edit-content"
    >
      <label className="modal__label">
        Name*
        <input
          className="modal__edit-name"
          type="text"
          minLength="3"
          maxLength="20"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </label>
      <label className="modal__label">
        Avatar
        <input
          className="modal__avatar-url"
          type="url"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
          placeholder="https://example.com/avatar.jpg"
          required
        />
      </label>
    </ModalWithForm>
  );
}
