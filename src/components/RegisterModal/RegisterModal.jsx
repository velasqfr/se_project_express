import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function RegisterModal({
  onClose,
  isOpen,
  onRegisterModalSubmit,
  onSwitchToLogin,
}) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setName("");
      setAvatar("");
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterModalSubmit({ name, avatar, email, password });
  };

  const isFormValid = email && password && name && avatar;

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isButtonDisabled={!isFormValid}
      isFormValid={isFormValid}
      modalContentClassName="modal__register-content"
      submitEditButton="register__submit-btn"
      switchButton={
        <button
          type="button"
          className="register__switch-btn"
          onClick={onSwitchToLogin}
        >
          or Log In
        </button>
      }
    >
      <label htmlFor="register-email" className="email__label">
        Email
        <input
          id="register-email"
          type="email"
          className="email__input"
          placeholder="Email"
          required
          minLength="10"
          maxLength="50"
          onChange={handleEmailChange}
          value={email}
        />
      </label>
      <label htmlFor="register-password" className="password__label">
        Password
        <input
          id="register-password"
          type="password"
          className="password__input"
          placeholder="Password"
          required
          minLength="5"
          maxLength="15"
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
      <label htmlFor="register-name" className="name__label">
        Name
        <input
          id="register-name"
          type="text"
          className="name__input"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="register-avatar" className="avatar__label">
        Avatar URL
        <input
          id="register-avatar"
          type="text"
          className="avatar__input"
          placeholder="Avatar URL"
          required
          minLength="1"
          maxLength="50"
          onChange={handleAvatarChange}
          value={avatar}
        />
      </label>
    </ModalWithForm>
  );
}
