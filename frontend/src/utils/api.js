class Api {
    constructor({ address, headers }) {
        this._address = address;
        this._headers = headers;
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
        return fetch(`${this._address}/cards`, {
            headers: this._headers,
        }).then(response => {
            return this._getResJson(response);
        });
    }


    addCard({ name, link }) {
        return fetch(`${this._address}/cards`, {
            method: 'POST',
            headers: this._headers,
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
        return fetch(`${this._address}/cards/${_id}`, {
            method: 'DELETE',
            headers: this._headers,
        })
            .then(response => {
                return this._getResData(response);
            })
    }


    changeLikeCardStatus(_id, isLiked) {
        return fetch(`${this._address}/cards/${_id}/likes`, {
            method: `${isLiked ? 'PUT' : 'DELETE'}`,
            headers: this._headers,
        })
            .then(response => {
                return this._getResJson(response);
            })
    }



    getPersonInfo() {
        return fetch(`${this._address}/users/me`, {
            headers: this._headers,
        }).then(response => {
            return this._getResJson(response);
        }).then(userInfo => {
            const info = { name: userInfo.name, about: userInfo.about, id: userInfo._id, avatar: userInfo.avatar }
            return info;
        });
    }


    patchPersonInfo(data) {
        return fetch(`${this._address}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        }).then(response => {
            return this._getResJson(response);
        });
    }

    patchAvatar(avatar) {
        return fetch(`${this._address}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        }).then(response => {
            return this._getResJson(response);
        });
    }

    updateToken() {
        this._headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
}


const api = new Api({
    address: `https://api.bestphotointheworld.nomoredomains.rocks/`,
    headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
});

export default api;