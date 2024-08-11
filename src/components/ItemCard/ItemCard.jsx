import React, { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const { userData } = React.useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  // Check if the item was liked by the current user
  // The likes array should be an array of ids

  const isLiked = item.likes.some((likeId) => likeId === userData._id);

  // Create a variable which you then set in `className` for the like button
  const itemLikeButtonClassName = isLiked
    ? "card__like-button-active"
    : "card__like-button";

  const handleLikeClick = (e) => {
    e.preventDefault();
    //console.log("handleLikeClick called with:", { id: item._id, isLiked });
    onCardLike(item, isLiked);
    //debugger;
  };

  return (
    <li className="card">
      <div className="card__header">
        <h2 className="card__name">{item.name}</h2>
        {isLoggedIn && (
          <button
            className={itemLikeButtonClassName}
            onClick={handleLikeClick}
          ></button>
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl || item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
