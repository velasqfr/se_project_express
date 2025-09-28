import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import { createUser, loginUser, checkToken } from "../../utils/auth";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherAPI";
import { coordinates, APIkey } from "../../utils/constants";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
//import { defaultClothingItems } from "../../utils/constants";
import {
  getItems,
  addItem,
  deleteItem,
  updateUserProfile,
} from "../../utils/api";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import { addCardLike, removeCardLike } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  //[State variable, setter function]
  //We ONLY ever call a setter function within the same component that it's state is defined in!
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState(""); //an empty string means(Default) => no modal is active here
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); //variable will be true when the user is logged in, and false otherwise
  const navigate = useNavigate();

  //If the current temperature is "F" switch it to "C", if it is "C" switch it to "F"
  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "F") {
      setCurrentTemperatureUnit("C");
    } else {
      setCurrentTemperatureUnit("F");
    }
  }; //or you can also do "setCurrentTemperatureUnit(currentTemperatureUnit === "F"? "C":"F");"

  /////////////////////--Opening & closing the Modal--////////////////////
  const handleAddClick = () => {
    console.log("Add button clicked");
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard(null);
  };

  //////////////////////--Opening the Register / Login Modal--/////////////////////
  const openRegisterModal = () => setActiveModal("register");

  const openLoginModal = () => setActiveModal("login");

  /////////////////// -- Adding Item to the Form Mode -- ///////////////////
  const handleAddItemModalSubmit = ({ name, imageUrl, weather }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("User not authenticated");
      return;
    }
    addItem({ name, imageUrl, weather }, token)
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]);
        closeActiveModal();
      })
      .catch(console.error);
  };

  //////////////////-- Opening & closing the Card-Modal--//////////////////

  //////////////////--Clicking the Card to open the Modal--/////////////////
  const handleCardClick = (card) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("User not authenticated");
      return;
    }
    setActiveModal("preview");
    setSelectedCard(card);
  };

  ///////////////////////--Delete Card item Handler --////////////////////////////
  const handleDeleteCard = (cardToDelete) => {
    const token = localStorage.getItem("token");

    deleteItem(cardToDelete._id, token)
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== cardToDelete._id)
        );
        //close all modals and reset selected card
        closeActiveModal();
      })
      .catch(console.error);
  };

  //////////////////////--New Handler for card liking--////////////////////
  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("User not authenticated");
      return;
    }
    //Checks if the card is currently liked (isLiked)
    //Calls either addCardLike or removeCardLike
    const apiCall = isLiked ? removeCardLike : addCardLike;

    //Replaces the liked card in state with the updated one from the server
    apiCall(id, token)
      .then((updatedCard) => {
        setClothingItems((prevCards) =>
          prevCards.map((item) => (item._id === id ? updatedCard : item))
        );
      })
      .catch((err) => console.error("Like/unlike failed", err));
  };

  //////////////////////--New Handler for confirmation deletion--////////////////////
  const openConfirmationModal = (card) => {
    setSelectedCard(card);
    setActiveModal("delete-confirm");
  };

  /////////////////////--New Handler for Register Submission--///////////////////////
  function handleRegisterSubmit({ name, avatar, email, password }) {
    console.log("Register submmit started");

    createUser({ name, avatar, email, password })
      .then(() => {
        // After successful registration, automatically log the user in
        return loginUser({ email, password });
      })
      .then((data) => {
        localStorage.setItem("token", data.token);
        return checkToken(data.token); // Fetch user data
      })
      .then((user) => {
        setCurrentUser(user); // sets user with correct data
        setIsLoggedIn(true);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Failed to register or login user", err);
      });
  }
  //////////////////////////--New Handler for Login Submission--///////////////////////
  function handleLoginSubmit({ email, password }) {
    return loginUser({ email, password })
      .then((data) => {
        localStorage.setItem("token", data.token);
        return checkToken(data.token); //Fetch user data
      })
      .then((user) => {
        setCurrentUser(user); // sets user with correct data
        setIsLoggedIn(true);
        closeActiveModal();
        return true; // sucesss
      })
      .catch((err) => {
        console.error("Login failed", err);
        return false; //failure
      });
  }

  //////////////////////////--New Handler for Logging Out --///////////////////////
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/", { replace: true });
  };

  ////////////////////////////--Edit Profile Modal--/////////////////////////////////
  const handleEditProfileClick = () => {
    setActiveModal("edit-profile"); //EditProfileModal opens when activeModal === "edit-profile"
  };

  const handleCloseEditModal = () => {
    setActiveModal("");
  };

  //////////////////////////--New Handler for Updating User in EditProfileModal--///////////////////////
  const handleUpdateUser = ({ name, avatar }) => {
    const token = localStorage.getItem("token");
    return updateUserProfile({ name, avatar }, token) //The form submits data to your backend and updates the app stat
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        setActiveModal("");
      })
      .catch((err) => {
        console.error("Failed to update user", err);
      });
  };

  //////////////////////-New Handler for Wiriging up Switch Handlers--///////////////////
  const onSwitchToRegister = () => setActiveModal("register");
  const switchToLogin = () => setActiveModal("login");

  ///////////////////////--Clicking the Card to open the Modal--///////////////////////

  ///////////////////////--API Weather - when the page loads/////////////////////////
  //the way a useEffect works, if you pass a second arguement that is an empty array, it will get run (&one time only) when the component first loads

  useEffect(() => {
    //We are passing the object 'coordinates' as the first firs property, and then structuring the property that is in the object
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    getItems(token)
      .then((data) => {
        console.log(data);
        //set the clothing items
        if (Array.isArray(data)) {
          setClothingItems(data);
        }
      })
      .catch(console.error);
  }, [currentUser]);

  /////////////////////////////--Check if there is a tokem--//////////////////////////////
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkToken(token)
        .then((user) => {
          console.log("User info from valid token:", user);
          //this keeps user logged in after refreshing the page
          setCurrentUser(user);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token not valid", err);
        });
    }
  }, []); //[] - Without it, the effect might run more often than you want

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              openLoginModal={openLoginModal}
              handleRegisterClick={openRegisterModal}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              handleLogout={handleLogout}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main //added because it the main route of the page
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    handleAddClick={handleAddClick}
                    openRegisterModal={openRegisterModal}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onEditClick={handleEditProfileClick}
                      handleLogout={handleLogout}
                      onCardLike={handleCardLike}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onClose={closeActiveModal}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteClick={openConfirmationModal}
          />
          <DeleteConfirmationModal
            isOpen={activeModal === "delete-confirm"}
            onClose={() => setActiveModal("preview")} // Cancel, go back to preview modal
            onConfirm={() => handleDeleteCard(selectedCard)} // Delete confirmed
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onClose={closeActiveModal}
            onRegisterModalSubmit={handleRegisterSubmit}
            onSwitchToLogin={switchToLogin}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onClose={closeActiveModal}
            onLoginModalSubmit={handleLoginSubmit}
            onSwitchToRegister={onSwitchToRegister}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={handleCloseEditModal}
            onSubmit={handleUpdateUser}
          />
          <Footer />
        </div>
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;

/*htmlFor: "" SHOULD MATCH THE ID: "" */
