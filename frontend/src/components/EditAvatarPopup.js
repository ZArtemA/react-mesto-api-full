import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  React.useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen]);


  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar(
      avatarRef.current.value
    );
  }

  return (
    <PopupWithForm
      title={'Обновить аватар'}
      name={'edit-avatar'}
      id={'profile'}
      button={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input type="url" name="link" ref={avatarRef} id="popup-avatar" placeholder="Ссылка на изображение"
        className="popup__input popup__link" required />
      <span className="popup__input-error" id="popup-avatar-error"></span>
    </PopupWithForm>
  )
}

export default EditAvatarPopup;