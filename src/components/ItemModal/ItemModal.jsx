import React, { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./ItemModal.css";

function ItemModal({
  activeModal,
  onClose,
  card,
  handleDeleteCard,
  isLoggedIn,
  confirmDeleteModal,
}) {
  const { userData } = useContext(CurrentUserContext);

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close modal__close-white"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__text">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          {isLoggedIn && card.owner === userData._id && (
            <button className="modal__delete-btn" onClick={confirmDeleteModal}>
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
