import { CurrentUserContext } from '../contexts/CurrentUserContext';
import React from 'react';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser.id;
    const cardDeleteButtonClassName = `card__btn-delete buttons ${isOwn ? '' : 'card__btn-delete_hidden'}`;

    const isLiked = card.likes.some(i => i._id === currentUser.id);
    const cardLikeButtonClassName = `card__btn-like buttons ${isLiked ? `card__btn-like_active` : ''}`;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }
    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="card__title-image">
            <div className="card__image" style={{ backgroundImage: `url(${card.link})` }} onClick={handleClick}></div>
            <button className={cardDeleteButtonClassName} type="button" aria-label="Удалить" onClick={handleDeleteClick}>
            </button>
            <div className="card__place">
                <h2 className="card__title">{card.name}</h2>
                <div className="card__likes">
                    <button className={cardLikeButtonClassName} type="button" aria-label="Лайк" onClick={handleLikeClick}>
                    </button>
                    <p className="card__like-numbers">{card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card;