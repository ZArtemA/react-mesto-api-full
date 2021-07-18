import React from 'react';
import closeButton from '../images/close.svg';

function ImagePopup(props) {
    return (
        <div className={`popup ${props.card.link ? "popup_opened" : ''}`}>
            <div className="popup__big-card">
                <button className="buttons popup__btn-close" type="button" aria-label="Закрыть" onClick={props.onClose}>
                    <img className="popup__btn-close-image" src={closeButton} alt="Закрыть" />
                </button>
                <img className="popup__image-big" src={props.card.link} alt={props.card.name} />
                <h3 className="popup__text">{props.card.name}</h3>
            </div>
        </div>
    )
};

export default ImagePopup;