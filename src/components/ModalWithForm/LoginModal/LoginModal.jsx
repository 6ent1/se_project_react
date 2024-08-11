import { useState } from "react";
import { Link } from "react-router-dom";
import ModalWithForm from "../ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({
  handleLogin,
  isOpen,
  closeActiveModal,
  handleSignUp,
}) => {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(data);
  };

  return (
    <ModalWithForm
      title="Sign In"
      buttonText="Sign in"
      isOpen={isOpen}
      onClose={closeActiveModal}
      onSubmit={handleSubmit}
    >
      <label htmlFor="username" className="signin-label">
        Email
      </label>
      <input
        id="username"
        required
        name="username"
        type="text"
        value={data.username}
        onChange={handleChange}
        className="signin-input"
        placeholder="Email"
      />
      <label htmlFor="password" className="signin-label">
        Password
      </label>
      <input
        id="password"
        required
        name="password"
        type="password"
        value={data.password}
        onChange={handleChange}
        className="signin-input"
        placeholder="Password"
      />
      <div>
        <div className="action-buttons">
          <button className="signin-button" type="submit">
            Log in
          </button>
          <button
            onClick={handleSignUp}
            type="button"
            className="login__signup"
          >
            or Sign Up
          </button>
        </div>
      </div>
    </ModalWithForm>
  );
};

export default LoginModal;
