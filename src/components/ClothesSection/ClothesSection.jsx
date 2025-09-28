import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";

//The ClothesSection component includes the ItemCard Component
function ClothesSection({
  clothingItems,
  handleCardClick,
  handleAddClick,
  onCardLike,
}) {
  //This gives us information about the user who is currently logged in, like their unique ID (_id), name, avatar, etc.
  const currentUser = useContext(CurrentUserContext);

  //Filtering clothing items to only include items owned by the currentUser._id
  const userClothingItems = clothingItems.filter(
    (item) => item.owner.toString() === currentUser._id.toString()
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__text">Your Items</p>
        <button
          onClick={handleAddClick}
          className="add__clothes-btn"
          type="button"
        >
          + Add New
        </button>
      </div>
      {userClothingItems.length === 0 ? ( //If no items are owned
        <p className="clothes-section__empty">You have no items yet.</p>
      ) : (
        <ul className="cards__list">
          {userClothingItems.map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick} //Pass as prop
                onCardLike={onCardLike}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default ClothesSection;
