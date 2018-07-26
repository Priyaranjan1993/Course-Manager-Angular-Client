import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor() {

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
      .then(response => response.json());
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
      method: 'POST',
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
