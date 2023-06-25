export default class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  /* ------------------ Checks Response from Server ------------------ */
  _checkServerResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
  }

  /* ------------------ Retrieves UserInfo from Server ------------------ */
  getUserInfo() {
    return fetch(`${this._baseURL}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._checkServerResponse(res);
    });
  }

  /* ------------------ Patches UserInfo in Server ------------------ */
  updateUserInfo(userData) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: userData.name,
        about: userData.description,
      }),
    }).then((res) => {
      console.log(res);
      return this._checkServerResponse(res);
    });
  }

  /* ------------------ Patches Avatar info in Server ------------------ */
  setUserAvatar(data) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => {
      console.log(res);
      return this._checkServerResponse(res);
    });
  }

  /* ------------------ Retrieves Initial Cards from Server ------------------ */
  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
    }).then((res) => {
      console.log(res);
      return this._checkServerResponse(res);
    });
  }

  getAppInfo() {
    return Promise.all([this.getInitialCards(), this.getUserInfo()]);
  }

  /* ------------------ Adds NewCard and sends to Server ------------------ */
  addCard(placeName, imgLink) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: placeName,
        link: imgLink,
      }),
    }).then((res) => {
      console.log(res);
      return this._checkServerResponse(res);
    });
  }

  /* ------------------ Deletes card from Server ------------------ */
  deleteCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      console.log(res);
      return this._checkServerResponse(res);
    });
  }

  changeLikeCardStatus(cardId, like) {}
}
