const PopupWithForm = ({
  name,
  extraClass,
  title,
  buttonText,
  children,
  isOpen,
  onClose,
  onSubmit,
}) => {
  return (
    <section className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <form
        className={`popup__form ${extraClass}`}
        name={`form-${name}`}
        onSubmit={onSubmit}
      >
        <button
          className="popup__close popup__close_name"
          type="button"
          onClick={onClose}
        ></button>
        <div className="popup__main-container">
          <h2 className="popup__heading">{title}</h2>

          {children}
          <button
            type="submit"
            className="popup__button"
          >
            {buttonText || "Сохранить"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default PopupWithForm;
