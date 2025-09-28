import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar({ onEditClick, handleLogout }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__user-info">
        <img
          src={currentUser?.avatar || avatar}
          alt="User Avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__name">
          {currentUser?.name || "Terrence Tegegne"}
        </p>
      </div>
      <button className="sidebar__edit-btn" onClick={onEditClick}>
        Change Profile Data
      </button>
      <button
        onClick={handleLogout}
        type="button"
        className="sidebar__logout-btn"
      >
        Logout
      </button>
    </div>
  );
}

/* <div className="sidebar__avatar-container">
        <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
    </div>
  );
} */

export default SideBar;
