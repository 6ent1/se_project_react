import ClothesSection from "../ClothesSection/ClothesSection";
import Sidebar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  onCardClick,
  clothingItems,
  handleAddClick,
  handleDeleteCard,
  onCardLike,
  handleEditProfile,
  handleLogout,
  isLoggedIn,
  isLiked,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar
          handleEditProfile={handleEditProfile}
          handleLogout={handleLogout}
        />
      </section>
      <section className="profile__clothes-section">
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          handleAddClick={handleAddClick}
          handleDeleteCard={handleDeleteCard}
          isLoggedIn={isLoggedIn}
          onCardLike={onCardLike}
          isLiked={isLiked}
        />
      </section>
    </div>
  );
}

export default Profile;
