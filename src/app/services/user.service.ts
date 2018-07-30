import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userName;

  constructor() {
  }


  getUserId() {
    return fetch('http://localhost:3000/api/getUserId', {
      method: 'GET',
      credentials: 'include'
    })
      .then(data => {
        console.log(data);
        if (data.headers.get('content-type') !== null) {
          return data.json();
        } else {
          return null;
        }
      });
  }

  setUserName() {
    return fetch('http://localhost:3000/api/getUserId', {
      method: 'GET',
      credentials: 'include'
    })
      .then(data => {
        if (data.headers.get('content-type') !== null) {
          return data.json();
        } else {
          return null;
        }
      })
      .then((data) => {
        this.userName = data.userName;
      });
  }

  loginUser(user) {
    /*return fetch('https://still-beyond-49650.herokuapp.com/api/login', {*/
    return fetch('http://localhost:3000/api/login', {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({userName: user.username, password: user.password}),
      credentials: 'include'
    })
      .then(response => {
        if (response.headers.get('content-type') !== null) {
          return response.json();
        } else {
          return null;
        }

      });
  }

  registerUser(user, role) {
    /*return fetch('https://still-beyond-49650.herokuapp.com/api/register', {*/
    return fetch('http://localhost:3000/api/register', {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({userName: user.regUsername, password: user.regPassword, role: role}),
      credentials: 'include'
    })
      .then(response => response.json());
  }

  checkUserName(userName) {
    /*return fetch('https://still-beyond-49650.herokuapp.com/api/user/' + userName, {*/
    return fetch('http://localhost:3000/api/user/' + userName, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'GET',
      credentials: 'include'
    })
      .then(response => {
        if (response.headers.get('content-type') != null) {
          return response.json();
        } else {
          return null;
        }
      });
  }

  updateProfile(profileData) {
    /*return fetch('https://still-beyond-49650.herokuapp.com/api/profile', {*/
    return fetch('http://localhost:3000/api/profile', {
      headers: {
        'content-type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(profileData),
      credentials: 'include'
    })
      .then(response => {
        if (response.headers.get('content-type') != null) {
          return response.json();
        } else {
          return null;
        }
      });
  }

  getProfile(username) {
    return fetch('http://localhost:3000/api/profile/' + username, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'GET',
      credentials: 'include'
    })
      .then(response => {
        if (response.headers.get('content-type') != null) {
          return response.json();
        } else {
          return null;
        }
      });
  }

  logout() {
    /* return fetch('https://still-beyond-49650.herokuapp.com/api/logout', {*/
    return fetch('http://localhost:3000/api/logout', {
      method: 'POST',
      credentials: 'include'
    });
  }
}

