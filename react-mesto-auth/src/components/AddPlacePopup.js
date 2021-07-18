import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onSubmit }) {


    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(name, link);
    }


    return (
        <PopupWithForm
            title={'Новое место'}
            name={'new-place'}
            id={'add'}
            button={'Добавить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <input type="text" onChange={handleChangeName} value={name} name="name" id="popup-image" placeholder="Название" className="popup__input"
                minLength="2" maxLength="30" required />
            <span className="popup__input-error" id="popup-image-error"></span>
            <input type="url" onChange={handleChangeLink} value={link} name="link" id="popup-link" placeholder="Ссылка на картинку"
                className="popup__input popup__link" required />
            <span className="popup__input-error" id="popup-link-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;