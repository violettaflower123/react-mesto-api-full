//const apiKey = "a0ee0daa-dcb0-4304-ba97-98bdc5d8faf1";

class Api {
    constructor(config) {
      this._url = config.url;
      this._headers = config.headers;
      //this._authorization = config.authorization;
    }
  
    _errorHandler = (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Произошла ошибка");
    };
  
    //получение данных о пользователе с сервера
    // getDataUser() {
    //   return fetch(`${this._url}users/me`, {
    //     method: "GET",
    //     headers: this._headers,
    //   }).then(this._errorHandler);
    // }
    getDataUser(token) {
      return fetch(`${this._url}users/me`, {
        method: "GET",
        headers: {
          ...this._headers,
        authorization: `Bearer ${token}`
      },
      }).then(this._errorHandler);
    }
  
    //получение карточек с сервера
    // getDataInitialCards() {
    //   return fetch(`${this._url}cards`, {
    //     method: "GET",
    //     headers: this._headers,
    //   }).then(this._errorHandler);
    // }
    getDataInitialCards(token) {
      return fetch(`${this._url}cards`, {
        method: "GET",
        headers: {
          ...this._headers,
        authorization: `Bearer ${token}`
      },
      }).then(this._errorHandler);
    }
  
    //добавить новую карточку
    // addCard(data) {
    //   return fetch(`${this._url}cards`, {
    //     method: "POST",
    //     headers: this._headers,
    //     body: JSON.stringify(data),
    //   }).then(this._errorHandler);
    // }
    addCard(data, token) {
        return fetch(`${this._url}cards`, {
          method: "POST",
          headers: {
            ...this._headers,
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(data),
        }).then(this._errorHandler);
      }
    

    
  
    //удалить карточку
    // deleteCard(id) {
    //   return fetch(`${this._url}cards/${id}`, {
    //     method: "DELETE",
    //     headers: this._headers,
    //   }).then(this._errorHandler);
    // }
    deleteCard(id, token) {
      return fetch(`${this._url}cards/${id}`, {
        method: "DELETE",
        headers: {
          ...this._headers,
          Authorization: `Bearer ${token}`
        },
      }).then(this._errorHandler);
    }
  
    // toggleLike(id, status) {
    //   return fetch(`${this._url}cards/${id}/likes`, {
    //     method: status ? "DELETE" : "PUT",
    //     headers: this._headers,
    //   }).then(this._errorHandler);
    // }
    toggleLike(id, status, token) {
        return fetch(`${this._url}cards/${id}/likes`, {
          method: status ? "DELETE" : "PUT",
          headers: {
            ...this._headers,
            Authorization: `Bearer ${token}`
          },
        }).then(this._errorHandler);
      }
  
    //два разных метода patch , потому что разные url
  
    //смена аватарки пользователя
    // changeAvatar(data) {
    //   return fetch(`${this._url}users/me/avatar`, {
    //     method: "PATCH",
    //     headers: this._headers,
    //     body: JSON.stringify(data),
    //   }).then(this._errorHandler);
    // }
    changeAvatar(data, token) {
      return fetch(`${this._url}users/me/avatar`, {
        method: "PATCH",
        headers: {
          ...this._headers,
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
      }).then(this._errorHandler);
    }
  
    //смена данных пользователя
    // changeUser(data) {
    //   return fetch(`${this._url}users/me`, {
    //     method: "PATCH",
    //     headers: this._headers,
    //     body: JSON.stringify(data),
    //   }).then(this._errorHandler);
    // }
    changeUser(data, token) {
      return fetch(`${this._url}users/me`, {
        method: "PATCH",
        headers: {
          ...this._headers,
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data),
      }).then(this._errorHandler);
    }
  }

  // const api = new Api({
  //   url: "https://nomoreparties.co/v1/cohort-41/",
  //   headers: {
  //     "Content-Type": "application/json",
  //     authorization: "a0ee0daa-dcb0-4304-ba97-98bdc5d8faf1",
  //   },
  // });
  const api = new Api({
    url: "http://mesto.project.api.nomoredomains.sbs/",
    headers: {
      "Content-Type": "application/json",
    },
  });

  export default api;