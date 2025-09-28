import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

//THe Profile component contains SideBar and ClothesSection components
function Profile({
  handleCardClick,
  clothingItems,
  handleAddClick,
  onEditClick,
  onCardLike,
  handleLogout,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="profile">
      <section className="profile__sidebar">
        <h2 className="profile__greeting">
          Welcome, {currentUser.name || "User"}!
        </h2>
        <p className="profile__email">
          {currentUser.email || "Email not available"}
        </p>
        <SideBar onEditClick={onEditClick} handleLogout={handleLogout} />
      </section>
      <section className="profile__clothing-items">
        <ClothesSection
          clothingItems={clothingItems}
          handleCardClick={handleCardClick}
          handleAddClick={handleAddClick}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
