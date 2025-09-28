import { useContext } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

//THe Header component includes the ToggleSwitch component
function Header({
  handleAddClick,
  weatherData,
  openLoginModal,
  isLoggedIn,
  handleRegisterClick,
}) {
  //This gives us information about the user who is currently logged in, like their unique ID (_id), name, avatar, etc.
  const currentUser = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const renderAvatar = () => {
    if (currentUser?.avatar) {
      // Case 1: If the currentUser object exists and has a non-empty avatar URL,
      // return an <img> tag that displays the user's avatar image.
      return (
        <img
          src={currentUser.avatar}
          alt={`${currentUser.name}'s avatar`}
          className="header__avatar"
        />
      );
    } else if (currentUser?.name) {
      // Case 2: If the user does not have an avatar but does have a name,
      // create a placeholder circle showing the first letter of their name.
      return (
        <div className="header__avatar-placeholder">
          {currentUser.name.charAt(0).toUpperCase()}
        </div>
      );
    } else {
      // Case 3: Fallback - If no avatar or name is present for some reason,
      // show a default fallback avatar image.
      return (
        <img
          src={avatar} //default avatar
          alt="User avatar"
          className="header__avatar"
        />
      );
    }
  };

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Weather Wear logo" />
      </Link>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city || "Loading..."}
      </p>
      <div className="header__right-section">
        <ToggleSwitch />

        {isLoggedIn ? (
          <>
            <button
              onClick={handleAddClick}
              type="button"
              className="header__add-clothes-btn"
            >
              + Add clothes
            </button>

            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__username">
                  {currentUser?.name || "User"}
                </p>
                {renderAvatar()}
              </div>
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={handleRegisterClick}
              type="button"
              className="header__register-btn"
            >
              Sign Up
            </button>
            <button
              onClick={openLoginModal}
              type="button"
              className="header__login-btn"
            >
              Log In
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;

/*{handleAddClick} is destructure from App.jsx to ensure the button works when clicked */
/*an onClick handler is then added to the button */
