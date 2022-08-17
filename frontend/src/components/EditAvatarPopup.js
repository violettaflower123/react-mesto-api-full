import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";
import React from "react";

const EditAvatarPopup = (props) => {

  //const [avatar, setAvatar] = useState('');
  const textInput = useRef();

  function setValue() {
    return textInput.current.value;
  }

  function setDefaultValue() {
    return textInput.current.value = '';
  }
  
  //очищение инпута при открытии
  useEffect(() => {
    if(props.isOpen) {
      setDefaultValue();
    }
  }, [props.isOpen]);

  //изменить аватар
  function handleChangeAvatar () {
    setValue(textInput);
  }

//что происходит при сабмите
  function handleSubmit(e) {
    e.preventDefault();
  
    props.onUpdateAvatar({
      avatar: textInput.current.value,
    })
  } 

return (
    <PopupWithForm
          name="avatar"
          title="Обновить аватар"
          extraClass="popup__form_type_avatar"
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
        >
          <fieldset className="popup__input-container">
            <input
              ref={textInput}
              required
              id="avatar"
              type="url"
              placeholder="Ссылка на аватар"
              name="avatar"
              className="popup__input popup__item-avatar"
              minLength="2"
              onChange={handleChangeAvatar}
  
            />
            <span
              className="popup__error popup__error_visible"
              id="avatar-error"
            ></span>
          </fieldset>
        </PopupWithForm>
)
}

export default EditAvatarPopup;