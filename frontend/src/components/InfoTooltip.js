import failedImage from '../images/sign-up-error.svg';
import successImage from '../images/sign-up-succeed.svg';
import closeButton from '../images/close.svg';

function InfoTooltip(props) {
    const popupImage = props.failed ? failedImage : successImage;
    const popupText = props.failed ? 'Что-то пошло не так! Попробуйте ещё раз.' : 'Вы успешно зарегистрировались!';

    return (
        <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <button className="buttons popup__btn-close popup__btn-close_registration" type="button" aria-label="Закрыть" onClick={props.onClose}>
                    <img className="popup__btn-close-image" src={closeButton} alt="Закрыть" />
                </button>
                <img src={popupImage} alt={popupText} className="popup__registration-image" />
                <p className="popup__registration-answer">{popupText}</p>
            </div>
        </div>
    );
}

export default InfoTooltip;