import React from "react";
import logo from "../images/logo.svg";
import {Route, Link} from "react-router-dom";

function Header({userData, onSignOut}) {
    return (
        <header className="header">
            <img className="header__logo" src={logo} alt="Лого" />
            <div className="header__menu">
            <Route exact path="/sign-up">
                    <Link to="/sign-in" className="header__button buttons">Войти</Link>
            </Route>
            <Route exact path="/sign-in">
                    <Link to="/sign-up" className="header__button buttons">Регистрация</Link>
            </Route>
            <Route exact path="/">
                    <p className="header__user-mail">{userData.email}</p>
                    <Link to="/sign-up" onClick={onSignOut} className="header__button buttons">Выход</Link>
            </Route>
            </div>
        </header>
    );
}
export default Header;