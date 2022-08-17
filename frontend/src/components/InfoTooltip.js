const InfoTooltip = (props) => {
  return (
    //<section className={`popup popup_type_${props.name} popup_opened`}>
      <section className={`popup popup_type_info ${props.isOpen && "popup_opened"}`}>
    
      <div className={`popup__form popup__form_type_confirm`}>
        <button
          className="popup__close popup__close_name"
          type="button"
          onClick={props.onClose}
        ></button>
        <div className="popup__main-container">
          <div>
            <div
              className={
                props.isSuccess ? "confirm__img-error" : "confirm__img-success"
              }
            ></div>
            <p className="confirm__title">
              {props.isSuccess
                ? "Что-то пошло не так! Зарегистрируйтесь еще раз."
                : "Вы успешно зарегистрировались!"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoTooltip;
