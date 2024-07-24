import avatar from "../../assets/Avatar.svg";

import "./SideBar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar}></img>
      <p className="sidebar__username">User Name</p>
    </div>
  );
}

export default Sidebar;
