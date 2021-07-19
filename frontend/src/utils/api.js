class Api {
    constructor({ address, token, groupID }) {
        this._address = address;
        this._token = token;
        this._groupID = groupID;
        this._getResJson = this._getResJson.bind(this);
    }

    _getResData(response) {
        if (response.ok) {
            return Promise.resolve("done");
        }
        return Promise.reject(new Error(`Ошибка: ${response.status}`));
    }

    _getResJson(response) {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(new Error(`Ошибка: ${response.status}`));
    }


    getInitialCards() {
        return fetch(`${this._address}/v1/${this._groupID}/cards`, {
            headers: {
                authorization: this._token
            }
        }).then(response => {
            return this._getResJson(response);
        });
    }


    addCard({ name, link }) {
        return fetch(`${this._address}/v1/${this._groupID}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then(response => {
                return this._getResJson(response);
            })
    }

    removeCard(_id) {
        return fetch(`${this._address}/v1/${this._groupID}/cards/${_id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token
            }
        })
            .then(response => {
                return this._getResData(response);
            })
    }


    changeLikeCardStatus(_id, isLiked) {
        return fetch(`${this._address}/v1/${this._groupID}/cards/likes/${_id}`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                return this._getResJson(response);
            })
    }



    getPersonInfo() {
        return fetch(`${this._address}/v1/${this._groupID}/users/me`, {
            headers: {
                authorization: this._token
            }
        }).then(response => {
            return this._getResJson(response);
        }).then(userInfo => {
            const info = { name: userInfo.name, about: userInfo.about, id: userInfo._id, avatar: userInfo.avatar }
            return info;
        });
    }


    patchPersonInfo(data) {
        return fetch(`${this._address}/v1/${this._groupID}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then(response => {
            return this._getResJson(response);
        });
    }

    patchAvatar(avatar) {
        return fetch(`${this._address}/${this._groupID}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                avatar
            })
        }).then(response => {
            return this._getResJson(response);
        });
    }
}

const api = new Api({
    address: `https://mesto.nomoreparties.co`,
    token: `f797dee9-663e-4fb3-a082-41f0cffe7621`,
    groupID: `cohort-22`
});

export default api;