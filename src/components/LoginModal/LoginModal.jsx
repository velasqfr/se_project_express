import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

export default function LoginModal({
  onClose,
  isOpen,
  onLoginModalSubmit,
  onSwitchToRegister,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setLoginError(false); // Reset error on modal open
    }
  }, [isOpen]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (loginError) setLoginError(false); // Reset on change
  };

  const isFormValid = email && password;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await onLoginModalSubmit({ email, password });
    if (!success) {
      setLoginError(true); //show error styles
    } else {
      setLoginError(false); // clear error styles
    }
  };

  return (
    <ModalWithForm
      title="Log In"
      buttonText="Log In"
      isOpen={isOpen}
      onClose={onClose}
      isButtonDisabled={!isFormValid}
      isFormValid={isFormValid}
      onSubmit={handleSubmit}
      modalContentClassName="modal__login-content"
      submitEditButton="login__submit-btn"
      switchButton={
        <button
          type="button"
          className="login__switch-btn"
          onClick={onSwitchToRegister}
        >
          or Register
        </button>
      }
    >
      <label htmlFor="login-email" className="email__label">
        Email
        <input
          id="login-email"
          type="email"
          className="email__input"
          placeholder="Email"
          required
          minLength="5"
          maxLength="50"
          onChange={handleEmailChange}
          value={email}
        />
      </label>

      <label htmlFor="login-password" className="password__label">
        Password
        <div className="input-wrapper">
          <input
            id="login-password"
            type="password"
            className={`password__input ${loginError ? "input-error" : ""}`}
            placeholder="Password"
            required
            minLength="5"
            maxLength="50"
            onChange={handlePasswordChange}
            value={password}
          />
          {loginError && (
            <span className="login__error-text-overlay">
              Incorrect password
            </span>
          )}
        </div>
      </label>
    </ModalWithForm>
  );
}
