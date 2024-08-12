import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ItemCard from "../ItemCard/ItemCard";
import "./ClothesSection.css";

function ClothesSection({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleDeleteCard,
  onCardLike,
  isLoggedIn,
  isLiked,
}) {
  const { userData } = useContext(CurrentUserContext);

  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your Items</p>
        <button
          className="clothes-section__header-btn"
          type="button"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>

      {isLoggedIn ? (
        <ul className="clothes-section__items">
          {clothingItems
            .filter((item) => {
              // console.log(item.owner, userData._id);
              return item.owner === userData._id;
            })
            .map((item, index) => (
              <ItemCard
                key={item._id || index}
                item={item}
                onCardClick={onCardClick}
                handleDeleteCard={handleDeleteCard}
                onCardLike={onCardLike}
                isLiked={isLiked}
                isLoggedIn={isLoggedIn}
              />
            ))}
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}

export default ClothesSection;
