import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { APIkey, coordinates } from "../../utils/constants";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import ItemModal from "../ItemModal/ItemModal";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Profile from "../Profile/Profile";

import { getToken, removeToken, setToken } from "../../utils/token.js";
import LoginModal from "../ModalWithForm/LoginModal/LoginModal.jsx";
import RegisterModal from "../ModalWithForm/RegisterModal/RegisterModal.jsx";

import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

import { api } from "../../utils/api.js";
import { auth } from "../../utils/auth.js";

import AddItemModal from "../AddItemModal/AddItemModal";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal.jsx";
import EditProfileModal from "../EditProfileModal/EditProfileModal.jsx";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 888 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [temp, setTemp] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    _id: "",
    username: "",
    avatar: "",
    email: "",
    name: "",
  });
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(false);

  const handleCardLike = (item, isLiked) => {
    const token = localStorage.getItem("jwt");
    // Check if this card is not currently liked

    const id = item._id;

    !isLiked
      ? // if so, send a request to add the user's id to the card's likes array
        api
          // the first argument is the card's id
          .addCardLike({ id, token })
          .then((updatedCard) => {
            //debugger;
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        api
          // the first argument is the card's id
          .removeCardLike({ id, token })
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard.data : item))
            );
          })
          .catch((err) => console.log(err));
  };

  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    }

    // Call the function, passing it the JWT.
    api
      .getUserInfo(token)
      .then(({ _id, username, name, email, avatar }) => {
        // If the response is successful, log the user in, save their
        // data to state, and navigate them to /profile.
        setIsLoggedIn(true);
        setUserData({ _id, username, name, email, avatar });
        navigate("/profile");
      })
      .catch(console.error);
  }, [isLoggedIn]);

  const handleRegistration = ({ username, avatar, email, password }) => {
    auth
      .signup(username, avatar, email, password)
      .then(() => {
        //handleLogin({ username: data.username, password: data.password });
        //navigate("/profile");
        setActiveModal("sign-in");
      })
      .catch(console.error);
  };

  const handleLogin = ({ username, password }) => {
    // If username or password empty, return without sending a request.
    if (!username || !password) {
      return;
    }

    auth
      .signin(username, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setIsLoggedIn(true);
          closeActiveModal();
          navigate("/profile");
        }
      })
      .catch(console.error);
  };

  const handleProfileUpdate = ({ name, avatar }) => {
    const token = getToken();
    api
      .editProfile({ name, avatar, token })
      .then((data) => {
        setUserData(data);
        closeActiveModal();
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogout = () => {
    removeToken();
    navigate("/");
    setIsLoggedIn(false);
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleEditProfile = () => {
    setActiveModal("edit-profile");
  };

  const handleSignUp = () => {
    setActiveModal("sign-up");
  };

  const handleSignIn = () => {
    setActiveModal("sign-in");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const confirmDeleteModal = () => {
    setActiveModal("confirm-delete");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const onAddItem = ({ name, weather, imageUrl }) => {
    const token = getToken();
    if (!token) return;

    api
      .addItem({ name, weather, imageUrl, token })
      .then((newItem) => {
        setClothingItems([newItem.data, ...clothingItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleDeleteItem = (selectedCard) => {
    const token = getToken();
    if (!token) return;

    api
      .removeItem(selectedCard._id, token)
      .then(() => {
        setClothingItems((clothingItems) =>
          clothingItems.filter((card) => selectedCard._id !== card._id)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    api
      .getItems()
      .then((data) => {
        setClothingItems(data);
        // console.log(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleKeyDown = (evt) => {
      if (!activeModal) return;
      if (evt.key === "Escape") {
        closeActiveModal();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModal]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!activeModal) return;
      if (e.target.classList.contains("modal")) {
        closeActiveModal();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeModal]);

  return (
    <CurrentUserContext.Provider value={{ userData }}>
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              temp={temp}
              weatherData={weatherData}
              handleSignUp={handleSignUp}
              handleSignIn={handleSignIn}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    weatherTemp={temp}
                    handleDeleteCard={handleDeleteItem}
                    onAddItem={onAddItem}
                    closeActiveModal={closeActiveModal}
                    onCardLike={handleCardLike}
                    isLiked={isLiked}
                    isLoggedIn={isLoggedIn}
                    confirmDeleteModal={confirmDeleteModal}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      weatherTemp={temp}
                      weatherData={weatherData}
                      handleDeleteCard={handleDeleteItem}
                      onAddItem={onAddItem}
                      closeActiveModal={closeActiveModal}
                      handleEditProfile={handleEditProfile}
                      handleLogout={handleLogout}
                      isLoggedIn={isLoggedIn}
                      onCardLike={handleCardLike}
                      isLiked={isLiked}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  isLoggedIn ? <Navigate to="/" /> : <Navigate to="/profile" />
                }
              />
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            onClose={closeActiveModal}
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
          />

          {activeModal === "sign-up" && (
            <RegisterModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "sign-up"}
              handleRegistration={handleRegistration}
              handleSignIn={handleSignIn}
            />
          )}

          {activeModal === "sign-in" && (
            <LoginModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "sign-in"}
              handleLogin={handleLogin}
              handleSignUp={handleSignUp}
            />
          )}

          {activeModal === "preview" && (
            <ItemModal
              activeModal={activeModal}
              card={selectedCard}
              onClose={closeActiveModal}
              handleDeleteCard={handleDeleteItem}
              confirmDeleteModal={confirmDeleteModal}
            />
          )}

          {activeModal === "confirm-delete" && (
            <ConfirmDeleteModal
              isOpen={activeModal === "confirm-delete"}
              card={selectedCard}
              closeActiveModal={closeActiveModal}
              confirmDeleteModal={confirmDeleteModal}
              handleDeleteCard={handleDeleteItem}
            />
          )}

          {activeModal === "edit-profile" && (
            <EditProfileModal
              isOpen={activeModal === "edit-profile"}
              onClose={closeActiveModal}
              handleProfileUpdate={handleProfileUpdate}
              //editProfile={handleEditProfile}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
