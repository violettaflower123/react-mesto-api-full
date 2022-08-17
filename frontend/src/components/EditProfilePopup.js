import { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { UserContext } from "../context/UserContext";
import api from "../utils/Api";

const EditProfilePopup = (props) => {
  const [name, setName] = useState('');

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  const [description, setDescription] = useState('');

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  const currentUser = useContext(UserContext);
//данные о пользователе
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);


    //что происходит при сабмите формы
  function handleSubmit(e) {
    // запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  } 
  

  return (
    <PopupWithForm
      name="name"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <fieldset className="popup__input-container">
        <input
          required
          id="name"
          type="text"
          placeholder="Введите имя"
          name="name"
          className="popup__input popup__input_el_heading"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleChangeName}
        />
        <span
          className="popup__error popup__error_visible"
          id="name-error"
        ></span>

        <input
          required
          id="job"
          type="text"
          placeholder="Введите профессию"
          name="about"
          className="popup__input popup__input_el_subheading"
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleChangeDescription}
        />
        <span
          className="popup__error popup__error_visible"
          id="job-error"
        ></span>
      </fieldset>
    </PopupWithForm>
  );
};

export default EditProfilePopup;
