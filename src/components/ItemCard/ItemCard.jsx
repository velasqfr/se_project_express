import { useContext } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  // Check if current user has liked the item
  const isLiked =
    currentUser && item.likes.some((id) => id === currentUser._id);

  // Handle clicking the image to open preview modal
  const handleCardClick = () => {
    onCardClick(item);
  };

  // Handle clicking the like button
  const handleLike = () => {
    onCardLike({ id: item._id, isLiked }); //Pass isLiked status to toggle it
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {currentUser && (
          <button
            className={`card__like-btn ${
              isLiked ? "card__like-btn_liked" : ""
            }`}
            onClick={handleLike}
          >
            {isLiked ? "❤️" : "🤍"}
          </button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;

/* we destructure "onCardClick" inside ItemCard from Main.jsx" */
