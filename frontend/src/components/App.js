import {
  useState,
  useEffect,
  useCallback,
  useContext,
  useSyncExternalStore,
} from "react";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import { UserContext } from "../context/UserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import { Link } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/auth.js";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userName: "",
    email: "",
  });
  const [isEditAvatarPopupOpen, setOpenAvatar] = useState(false);
  const [isEditProfilePoupOpen, setOpenProfile] = useState(false);
  const [isAddPlacePopupOpen, setOpenPlace] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isInfotoolOpen, setOpenInfotool] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });
  const [token, setToken] = useState("");

  //проверка асторизован ли пользователь при загрузке страницы
  const tockenCheck = useCallback(() => {
    let jwt = localStorage.getItem("token");
    if (jwt) {
      setToken(jwt);
      auth
        .checkToken(jwt)
        .then((data) => {
          if (data.user.email) {
            setUserData({
              userData: data.data.user._id,
              email: data.data.user.email,
            });
            setLoggedIn(true);
            navigate("/");
          }
        })
        .catch((err) => console.log(err));
    }
  }, [navigate]);
  //проверка токена при каждой загрузке страницы
  // useEffect(() => {
  //   tockenCheck();
  // }, []);
  useEffect(() => {
    tockenCheck();
  }, [tockenCheck]);

  //получить карточки с сервера
  // useEffect(() => {
  //   if (loggedIn === true) {
  //     api
  //       .getDataInitialCards()
  //       .then((cards) => {
  //         setCards(cards);
  //       })
  //       .catch((err) => alert(err));
  //   }
  // }, [loggedIn]);

  useEffect(() => {
    if (loggedIn === true) {
      const token = localStorage.getItem("token");
      api
        .getDataInitialCards(token)
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => alert(err));
    }
  }, [loggedIn]);

  //получить данные о пользователе с сервера
  // useEffect(() => {
  //   if(loggedIn === true) {
  //    api
  //        .getDataUser()

  //        .then((profile) => {
  //          setCurrentUser(profile);
  //        })
  //        .catch((err) => alert(err));
  //      }
  //    }, [loggedIn]);
  useEffect(() => {
    if (loggedIn === true) {
      const token = localStorage.getItem("token");
      api
        .getDataUser(token)

        .then((profile) => {
          setCurrentUser(profile);
        })
        .catch((err) => alert(err));
    }
  }, [loggedIn]);

  //открытие попапов
  function handleEditAvatarClick() {
    setOpenAvatar(true);
  }

  function handleEditProfileClick() {
    setOpenProfile(true);
  }

  function handleAddPlaceClick() {
    setOpenPlace(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleInfoTool() {
    setOpenInfotool(true);
  }
  //закрытие окна подтверждения регистрации
  function closeInfotoolTip() {
    closeAllPopups();
    navigate("/signin");
  }

  //закрытие попапов
  function closeAllPopups() {
    setOpenAvatar(false);
    setOpenPlace(false);
    setOpenProfile(false);
    setSelectedCard(null);
    setOpenInfotool(false);
  }

  //закрытие окна подтверждения регистрации в зависимости от того, успех или ошибка
  function onCloseInfotool(isSuccess) {
    return isSuccess ? closeAllPopups : closeInfotoolTip;
  }

  //обновление данных о пользователе
  // function handleUpdateUser(data) {
  //   api
  //     .changeUser(data)
  //     .then((profile) => {
  //       setCurrentUser(profile);
  //       closeAllPopups();
  //     })
  //     .catch((err) => alert(err));
  // }
  function handleUpdateUser(data) {
    const token = localStorage.getItem("token");
    api
      .changeUser(data, token)
      .then((profile) => {
        setCurrentUser(profile);
        closeAllPopups();
      })
      .catch((err) => alert(err));
  }

  //обновление аватарки
  // function handleUpdateAvatar(data) {
  //   api
  //     .changeAvatar(data)
  //     .then((profile) => {
  //       setCurrentUser(profile);
  //       closeAllPopups();
  //     })
  //     .catch((err) => alert(err));
  // }
  function handleUpdateAvatar(data) {
    const token = localStorage.getItem("token");
    api
      .changeAvatar(data, token)
      .then((profile) => {
        setCurrentUser(profile);
        closeAllPopups();
      })
      .catch((err) => alert(err));
  }

  // //добавление новой карточки
  // function handleAddNewCard(data) {
  //   api
  //     .addCard(data)
  //     .then((newCard) => {
  //       setCards([newCard, ...cards]);
  //       closeAllPopups();
  //     })
  //     .catch((err) => alert(err));
  // }
  //добавление новой карточки
  function handleAddNewCard(data) {
    const token = localStorage.getItem("token");
    api
      .addCard(data, token)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => alert(err));
  }

  //ставим лайки
  // function handleCardLike(card) {
  //   // Снова проверяем, есть ли уже лайк на этой карточке
  //   const isLiked = card.likes.some((i) => i._id === currentUser._id);

  //   // Отправляем запрос в API и получаем обновлённые данные карточки
  //   api
  //     .toggleLike(card._id, isLiked)
  //     .then((newCard) => {
  //       setCards((state) =>
  //         state.map((c) => (c._id === card._id ? newCard : c))
  //       );
  //     })
  //     .catch((err) => alert(err));
  // }
  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    // api
    //   .toggleLike(card._id, isLiked, token)
    //   .then((newCard) => {
    //     setCards((state) =>
    //       state.map((c) => (c._id === card._id ? newCard : c))
    //     );
    //   })
    //   .catch((err) => alert(err));
    const token = localStorage.getItem("token");
    api
      .toggleLike(card._id, isLiked, token)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => alert(err));
  }

  //удаление карточки
  function handleCardDelete(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isOwn = card.owner._id === currentUser._id;

    // Отправляем запрос в API и получаем обновлённые данные карточки
    const token = localStorage.getItem('token'); 
    api
      .deleteCard(card._id, auth.checkToken)
      .then(() => {
        setCards((state) => state.filter((c) => (c._id === card._id ? "" : c)));
      })
      .catch((err) => alert(err));
      // const token = localStorage.getItem('token'); 
      // api
      //   .deleteCard(card._id, auth.checkToken)
      //   .then(() => {
      //     setCards((state) => state.filter((c) => (c._id === card._id ? "" : c)));
      //   })
      //   .catch((err) => alert(err));
  }

  // //проверка асторизован ли пользователь при загрузке страницы
  // const tockenCheck = () => {
  //   let jwt = localStorage.getItem("token");
  //   if (jwt) {
  //     auth.checkToken(jwt).then((data) => {
  //       if (data.data.email) {
  //         setUserData({
  //           userData: data.data._id,
  //           email: data.data.email,
  //         });
  //         setLoggedIn(true);
  //         navigate("/");
  //       }
  //     }).catch((err) => console.log(err));
  //   }
  // };

  //регистрация
  const handleRegister = (email, password) => {
    auth
      .register(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setUserData({
            userName: data.data.user._id,
            email: data.user.email,
          });
        }
      })
      .then(() =>
        //setSuccess(true),
        handleInfoTool()
      )
      .catch(() => setSuccess(true), handleInfoTool());
  };

  //логин
  const handleLogin = (email, password) => {
    auth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          setOpenInfotool(false);
          localStorage.setItem("token", data.token);
          setUserData({
            userName: data.user._id,
            email: data.user.email,
          });
          setLoggedIn(true);
          navigate("/");
          tockenCheck();
        }
      })
      .catch(() => setSuccess(true), handleInfoTool());
  };

  //выход из системы
  const handleLogOut = () => {
    localStorage.removeItem("token");
    setUserData({
      userName: "",
      email: "",
    });
    setToken("");
    setLoggedIn(false);
    navigate("/signin");
  };

  return (
    <UserContext.Provider value={currentUser}>
      <div className="app">
        <div className="page__content">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Header>
                    <div>
                      <span className="header__user-email">
                        {userData.email}
                      </span>
                      <button
                        className="header__exit-btn"
                        onClick={handleLogOut}
                      >
                        Выйти
                      </button>
                    </div>
                  </Header>

                  <ProtectedRoute
                    path="/"
                    component={Main}
                    isLogged={loggedIn}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  ></ProtectedRoute>
                  <Footer />
                </>
              }
            />
            <Route
              path="/signup"
              element={
                <div className="app">
                  <div className="page__content">
                    <Header>
                      <Link to={"/signin"} className="header__redirect-link">
                        Вход
                      </Link>
                    </Header>
                    <Register
                      title="Регистрация"
                      buttonText="Зарегистрироваться"
                      handleRegister={handleRegister}
                    >
                      <Link to={"/signin"} className="popup__btm-redirect-link">
                        Уже зарегистрированы? войти.
                      </Link>
                    </Register>
                  </div>
                </div>
              }
            />
            <Route
              path="/signin"
              element={
                <div className="app">
                  <div className="page__content">
                    <Header>
                      <Link to={"/signup"} className="header__redirect-link">
                        Регистрация
                      </Link>
                    </Header>
                    <Login
                      title="Вход"
                      buttonText="Войти"
                      handleLogin={handleLogin}
                    />
                  </div>
                </div>
              }
            />
            <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/" replace />
                ) : (
                  <Navigate to="/signin" replace />
                )
              }
            />

            <Route path="*" element={<Navigate to="/signin" />} />
          </Routes>

          <InfoTooltip
            isOpen={isInfotoolOpen}
            isSuccess={isSuccess}
            onClose={isSuccess ? closeAllPopups : closeInfotoolTip}
            //onClose={onCloseInfotool}
          ></InfoTooltip>

          <EditProfilePopup
            isOpen={isEditProfilePoupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddNewPlace={handleAddNewCard}
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

          <PopupWithForm
            name="delete"
            title="Вы уверены?"
            buttonText="Да"
            extraClass="popup__form_type_delete"
          />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
