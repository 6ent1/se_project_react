import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "../ModalWithForm/ModalWithForm.css";
import "./AddItemModal.css";

const AddItemModal = ({ onClose, onAddItem, isOpen }) => {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    //console.log(e.target.value);
    setName(e.target.value);
  };

  const [link, setUrl] = useState("");
  const handleUrlChange = (e) => {
    //console.log(e.target.value);
    setUrl(e.target.value);
  };

  const [selectedOption, setSelectedOption] = useState("");
  const handleTempChange = (e) => {
    //console.log(e.target.value);
    setSelectedOption(e.target.value);
  };

  // const { values, handleChange, setValues } = useForm({
  //   name: "",
  //   imageUrl: "",
  //   weather: "",
  // });

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   onAddItem(values, () => {
  //     setValues({ name: "", imageUrl: "", weather: "" });
  //   });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, weather: selectedOption, imageUrl: link });
  };

  return (
    <ModalWithForm
      buttonText="Add garment"
      title="New garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          placeholder="Name"
          name="name"
          value={name}
          onChange={handleNameChange}
          id="name"
          type="text"
          className="modal__input"
          minLength="1"
          maxLength="30"
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          placeholder="Image Url"
          value={link}
          name="imageUrl"
          onChange={handleUrlChange}
          id="imageUrl"
          type="url"
          className="modal__input"
          minLength="1"
        />
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="hot"
            value="hot"
            type="radio"
            onChange={handleTempChange}
            className="modal__radio-input"
            // checked={values.weather === "hot"}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="warm"
            value="warm"
            type="radio"
            className="modal__radio-input"
            // checked={values.weather === "warm"}
            onChange={handleTempChange}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            value="cold"
            id="cold"
            type="radio"
            className="modal__radio-input"
            // checked={values.weather === "cold"}
            onChange={handleTempChange}
          />{" "}
          Cold
        </label>
      </fieldset>
      <div>
        <button className="add-button" type="submit">
          Add Item
        </button>
      </div>
    </ModalWithForm>
  );
};

export default AddItemModal;
