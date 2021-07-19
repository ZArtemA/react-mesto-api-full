import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name || '');
        setDescription(currentUser.about || '');
    }, [currentUser, isOpen]);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');


    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            title={'Редактировать профиль'}
            name={'edit-profile'}
            id={'edit'}
            button={'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input type="text" value={name} onChange={handleChangeName} name="name" id="popup-name" placeholder="Имя" className="popup__input" minLength="2"
                maxLength="40" required />
            <span className="popup__input-error" id="popup-name-error"></span>
            <input type="text" value={description} onChange={handleChangeDescription} name="info" id="popup-profession" placeholder="Деятельность" className="popup__input"
                minLength="2" maxLength="200" required />
            <span className="popup__input-error" id="popup-profession-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;