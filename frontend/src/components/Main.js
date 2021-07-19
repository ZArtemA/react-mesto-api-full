import React from 'react';
import editButton from '../images/edit.svg';
import addButton from '../images/plus.svg';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main(props) {

    const currentUser = React.useContext(CurrentUserContext);


    return (
        <main className="content">

            <section className="profile">
                <div className="profile__info">
                    <div className="profile__image-place" type="button" onClick={props.onEditAvatar}>
                        <div className="profile__image-overlay"></div>
                        <div className="profile__image" style={{ backgroundImage: `url(${currentUser.avatar})` }} alt="Жак-Ив Кусто"></div>
                    </div>
                    <div className="profile__edit">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button className="buttons profile__btn-edit" type="button" aria-label="Редактировать профиль" onClick={props.onEditProfile}>
                            <img className="profile__btn-edit-image" src={editButton} alt="Редактировать" />
                        </button>
                        <p className="profile__profession">{currentUser.about}</p>
                    </div>
                </div>
                <button className="buttons profile__btn-add" type="button" aria-label="Добавить карточку" onClick={props.onAddPlace}>
                    <img className="profile__btn-add-image" src={addButton} alt="Добавить" />
                </button>
            </section>
            <section className="cards">
                <ul className="cards__gallery">
                    {props.cards.map((cardObj) => {
                        return (<
                            Card key={cardObj._id}
                            card={cardObj}
                            onCardClick={props.onCardClick}
                            onCardDelete={props.onCardDelete}
                            onCardLike={props.onCardLike}
                        />
                        );
                    }
                    )}
                </ul>
            </section>
        </main>
    );
}

export default Main;