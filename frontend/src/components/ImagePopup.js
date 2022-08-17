const ImagePopup = ({ card, onClose }) => {
  return (
    <section
      className={`popup popup_type_image ${card && "popup_opened"}`}
      aria-label="Модальное окно с увеличенным изображением"
    >
      <div className="popup__container-image">
        <button
          className="popup__close popup__close_image"
          type="button"
          onClick={onClose}
        ></button>
        <img className="popup__big-image" src={card?.link} alt={card?.name} />
        <p className="popup__text-fullscreen">{card?.name}</p>
      </div>
    </section>
  );
};

//src={card ? card.link : ''} 
//<-- то же самое, что и у меня написано, но короче, опциональную цепочку, 
//она останавливает вычисление если значение перед ?. равно null или undefined
export default ImagePopup;
