import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/Avatar.svg";
import logo from "../../assets/Logo.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import "./Header.css";

function Header({
  handleAddClick,
  weatherData,
  handleSignUp,
  handleSignIn,
  isLoggedIn,
}) {
  const { userData } = React.useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </Link>

      <div className="header__mobile-user-container"></div>

      <input
        type="checkbox"
        className="header__user-container_toggle"
        id="header__user-container_toggle"
      />
      <label htmlFor="header__user-container_toggle"></label>

      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>

      <ToggleSwitch />
      {isLoggedIn && userData ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add Clothes
          </button>
          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{userData.name}</p>
              <img
                src={userData.avatar}
                alt={userData.name}
                className="header__avatar"
              />
            </div>
          </Link>
        </>
      ) : (
        <>
          <button onClick={handleSignUp} className="header__sign-up">
            Sign Up
          </button>
          <button onClick={handleSignIn} className="header__sign-in">
            Sign In
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
