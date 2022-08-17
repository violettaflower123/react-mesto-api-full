import React, { useState } from "react";

const Register = ({ title, buttonText, children, handleRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegisterEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleRegisterPassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(email, password);
  };

  return (
    <section className="popup_type_sign">
      <form
        className="popup__form popup__form_type_sign"
        name="signup-form"
        onSubmit={handleSubmit}
      >
        <div className="popup__main-container">
          <h2 className="popup__heading popup__heading_type_sign">{title}</h2>

          <fieldset className={"popup__input-container_type_sign"}>
            <input
              required
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              className="popup__input popup__input_type_sign popup__item-email"
              minLength="2"
              onChange={handleRegisterEmail}
              value={email}
            />
            <input
              required
              id="password"
              type="password"
              placeholder="Пароль"
              name="password"
              className="popup__input popup__input_type_sign popup__item-password"
              minLength="2"
              onChange={handleRegisterPassword}
              value={password}
            />
          </fieldset>
          <button
            type="submit"
            className="popup__button popup__button_type_sign"
          >
            {buttonText || "Сохранить"}
          </button>
          <p className="popup__btm-redirect">
            {children}
          </p>
        </div>
      </form>
    </section>
  );
};
export default Register;
