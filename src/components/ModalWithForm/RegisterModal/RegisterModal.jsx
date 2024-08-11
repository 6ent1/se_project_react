import { useState } from "react";
import { Link } from "react-router-dom";
import ModalWithForm from "../ModalWithForm";
import "./RegisterModal.css";

const RegisterModal = ({
  handleRegistration,
  isOpen,
  handleSignIn,
  closeActiveModal,
}) => {
  // The inputs are controlled via a single piece of state: an object
  // object called `data`. This lets us avoid writing separate change
  // handlers for each input.
  const [data, setData] = useState({
    username: "",
    avatar: "",
    email: "",
    password: "",
  });

  // This function fires whenever an input is changed, and it updates
  // the value of the changed input. Note that the keys of this
  // object match the name attributes of the corresponding inputs.
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="Sign up"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label className="register-label" htmlFor="email">
        Email *
      </label>
      <input
        id="email"
        name="email"
        type="email"
        value={data.email}
        onChange={handleChange}
        className="register-input"
        placeholder="Email"
        required
      />
      <label className="register-label" htmlFor="password">
        Password *
      </label>
      <input
        id="password"
        name="password"
        type="password"
        value={data.password}
        onChange={handleChange}
        className="register-input"
        placeholder="Password"
        required
      />
      <label className="register-label" htmlFor="username">
        Name *
      </label>
      <input
        id="username"
        name="username"
        type="text"
        value={data.username}
        onChange={handleChange}
        className="register-input"
        placeholder="Name"
        required
      />
      <label className="register-label" htmlFor="avatar">
        Avatar URL *{" "}
      </label>
      <input
        id="avatar"
        name="avatar"
        type="text"
        value={data.avatar}
        onChange={handleChange}
        className="register-input"
        placeholder="Avatar URL"
        required
      ></input>
      <div className="action-buttons">
        <button type="submit" className="register__form-signup">
          Sign up
        </button>

        <button
          onClick={handleSignIn}
          type="button"
          className="register__login-link"
        >
          or Log in
        </button>
      </div>
    </ModalWithForm>
  );
};

export default RegisterModal;
