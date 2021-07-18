export const BASE_URL = 'https://auth.nomoreparties.co';
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
};


 const getResJson = (response) => {
  const data = response.json();
  if (!response.ok) {
    return Promise.reject(response.status);
  }
  return data;
}



export const register = (password, email) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(password, email)
  })
    .then(response => {
      return getResJson(response);
    })
};


export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ password, email })
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.token) {
        localStorage.setItem("jwt", data.token);
        return data;
      }
    });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      headers,
      Authorization: `Bearer ${token}`,
    }
  }).then(response => {
    return getResJson(response);
  })
};