import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

const AddPlacePopup = (props) => {
    const [newCardLink, setNewCardLink] = useState('');
    const [newCardName, setNewCardName] = useState('');

    useEffect(() => {
      if(props.isOpen) {
        setNewCardLink('');
        setNewCardName('');
      }
    }, [props.isOpen]);

    function handleAddPlaceLink (evt) {
        setNewCardLink(evt.target.value);
    }

    function handleAddPlaceName (evt) {
        setNewCardName(evt.target.value);
    }

        //что происходит при сабмите формы
  function handleSubmit(e) {
    // запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // передаём значения управляемых компонентов во внешний обработчик
    props.onAddNewPlace({
      link: newCardLink,
      name: newCardName
    });
  } 

    return (
        <PopupWithForm
            name="place"
            title="Новое место"
            isOpen={props.isOpen}
            onClose={props.onClose}
            onSubmit={handleSubmit}
          >
            <fieldset className="popup__input-container">
              <input
                required
                id="place"
                type="text"
                placeholder="Название"
                name="name"
                className="popup__input popup__item-place"
                minLength="2"
                onChange={handleAddPlaceName}
                value={newCardName}
              />
              <span
                className="popup__error popup__error_visible"
                id="place-error"
              ></span>

              <input
                id="link"
                type="url"
                required
                placeholder="Ссылка на картинку"
                name="link"
                className="popup__input popup__item-link"
                onChange={handleAddPlaceLink}
                value={newCardLink}
              />
              <span
                className="popup__error popup__error_visible"
                id="link-error"
              ></span>
            </fieldset>
          </PopupWithForm>

    )
}

export default AddPlacePopup;