import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import PopupWithForm from './PopupWithForm';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import React from 'react';
import api from '../utils/api';
import '../index.css';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, useHistory, Redirect } from 'react-router-dom';
import * as auth from '../utils/auth';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';



function App() {


  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ name: '', link: '' });
  const [currentUser, setCurrentUser] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isRegistrationSucceed, setIsRegistrationSucceed] = React.useState(false);
  const [userData, setUserData] = React.useState({ email: '', password: '' })
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const history = useHistory();



  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }
  function handleCardClick(card) {
    setSelectedCard(card)
  }

  React.useEffect(() => {
    Promise.all([
      api.getPersonInfo(),
      api.getInitialCards()
    ])
      .then((result) => {
        const [ownerInfo, cardsArray] = result;
        setCurrentUser({
          name: ownerInfo.name,
          about: ownerInfo.about,
          avatar: ownerInfo.avatar,
          id: ownerInfo.id
        })
        setCards(cardsArray)
      })
      .catch((error) => {
        console.log(`Ошибка получения данных: ${error}`);
      });
  }, [])

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard({ name: '', link: '' })
    setIsInfoTooltipOpen(false)
  }

  function handleUpdateUser(currentUser) {
    api.patchPersonInfo(currentUser)
      .then((result) => {
        setCurrentUser({
          name: result.name,
          about: result.about,
          avatar: result.avatar,
          id: result.id
        })
        closeAllPopups();
      })
      .catch((error) => { 
        console.log(`Ошибка редактирования данных: ${error}`); 
      });
  }

  function handleUpdateAvatar(currentUser) {
    api.patchAvatar(currentUser)
      .then((result) => {
        setCurrentUser({
          name: result.name,
          about: result.about,
          avatar: result.avatar,
          id: result.id
        })
        closeAllPopups();
      })
      .catch((error) => { 
        console.log(`Ошибка изменения аватара: ${error}`); 
      }); 
  }


  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser.id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => {
        console.log(`Ошибка лайка: ${error}`);
      });
  }

  function handleCardDelete(card) {
    api.removeCard(card._id)
      .then(() => {
        setCards(cards => cards.filter((state) => state._id !== card._id));
      })
      .catch((error) => {
        console.log(`Ошибка удаления карточки: ${error}`);
      });
  }

  function handleAddPlaceSubmit(name, link) {
    api.addCard({ name, link })
      .then((newCard) => {
        setCards(cards => ([newCard, ...cards]));
        closeAllPopups();
      })
      .catch((error) => {
        console.log(`Ошибка добавления карточки: ${error}`);
      });
  }


  function handleRegister(email, password) {
    auth.register(email, password)
      .then(() => setIsRegistrationSucceed(false))
      .then(() => setIsInfoTooltipOpen(true))
      .then(() => history.push('/sign-in'))
      .then(() => {
        setTimeout(() => {
          setIsInfoTooltipOpen(false);
        }, 3000);
      })
      .catch((error) => {
        setIsRegistrationSucceed(true);
        setIsInfoTooltipOpen(true);
        console.log(`Ошибка: ${error}`)
      })
  }


  function handleLogin({ email, password }) {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setUserData({ email: email, password: password, })
          setLoggedIn({
            loggedIn: true
          });
          history.push("/");
          return loggedIn;
        }
      })
      .catch(error => {
        if (error === 401) {
          return console.log(`Пользователь с таким email не найден: ${error}`);
        }
        if (error === 400) {
          return console.log(`Не передано одно из полей: ${error}`);
        }
        console.log(`Ошибка: ${error}`);
      });
  }


  function tokenCheck() {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      auth.checkToken(token).then((res) => {
        if (res) {
          setLoggedIn({
            loggedIn: true,
          });
          setUserData({ email: res.data.email, id: res.data._id });
          history.push("/");
        }
      })
        .catch((error) => {
          console.log(`Ошибка проверки токена: ${error}`)
        })
    }
  }

  React.useEffect(() => {
    tokenCheck();
  }, [])


  function handleSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <>
        <div className="page__container">
          <Header
            userData={userData}
            onSignOut={handleSignOut}
          />
          <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn}>
              <Main
                onEditAvatar={() => { handleEditAvatarClick() }}
                onEditProfile={() => { handleEditProfileClick() }}
                onAddPlace={() => { handleAddPlaceClick() }}
                onCardClick={(card) => { handleCardClick(card) }}
                cards={cards}
                onCardLike={(card) => { handleCardLike(card) }}
                onCardDelete={(card) => { handleCardDelete(card) }}
              />
            </ProtectedRoute>
            <Route path="/sign-up">
              <Register handleRegister={handleRegister} />
            </Route>
            <Route path="/sign-in">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route>
              {loggedIn ? (<Redirect to="/" />) : (<Redirect to="/sign-in" />)}
            </Route>
          </Switch>
          <Footer />
        </div>
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onSubmit={handleAddPlaceSubmit} />
        <PopupWithForm
          title={'Вы уверены?'}
          name={'confirm'}
          id={'delete'}
          button={'Да'}
          onClose={closeAllPopups}
        />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          failed={isRegistrationSucceed}
        />
      </>
    </CurrentUserContext.Provider>
  );
}

export default App;