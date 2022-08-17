import React, { Children } from "react";

const Header = ({children}) => {
    return (
        <header className="header">
        <a className="header__logo" alt="Логотип" href='#'/>
        <div className="header__redirect">{children}</div>
      </header>
    )
}

export default Header;