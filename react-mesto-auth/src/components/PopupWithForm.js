import React from 'react';
import closeButton from '../images/close.svg';


function PopupWithForm(props) {
    return (
        <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}
            id={props.id}
        >
            <div className="popup__container">
                <button className="buttons popup__btn-close" type="button" aria-label="Закрыть" onClick={props.onClose}>
                    <img className="popup__btn-close-image" src={closeButton} alt="Закрыть" />
                </button>
                <h3 className="popup__title">{props.title}</h3>
                <form className="popup__textplace" id={`${props.id}-form`} name={`${props.name}-form`} onSubmit={props.onSubmit}>
                    {props.children}
                    <button className="popup__btn-save" type="submit" value="Сохранить" aria-label="Сохранить">{props.button}</button>
                </form>
            </div>
        </div>
    )
};

export default PopupWithForm;