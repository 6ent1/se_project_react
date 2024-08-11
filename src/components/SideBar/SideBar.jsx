import React, { useContext } from "react";
import avatar from "../../assets/Avatar.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./SideBar.css";

function Sidebar({ handleEditProfile, handleLogout }) {
  const { userData } = React.useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <div className="sidebar__title">
        <img
          className="sidebar__avatar"
          src={userData.avatar}
          alt="profile-avatar"
        />
        <p className="sidebar__username">{userData.username}</p>
      </div>
      <button className="sidebar__edit" onClick={handleEditProfile}>
        Change Profile Data
      </button>
      <button onClick={handleLogout} className="sidebar__logout-button">
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
