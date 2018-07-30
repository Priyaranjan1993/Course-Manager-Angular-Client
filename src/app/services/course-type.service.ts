import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseTypeService {

  constructor() {
  }

  makePublic(courseId) {
    return fetch('http://localhost:3000/api/course/type/' + courseId + '/public', {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      credentials: 'include'
    })
      .then(response => {
        console.log(response);
        return response.json();
      });
  }

  makePrivate(courseId) {
    return fetch('http://localhost:3000/api/course/type/' + courseId + '/private', {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      credentials: 'include'
    })
      .then(response => {
        console.log(response);
        return response.json();
      });
  }

  checkType(courseId) {
    return fetch('http://localhost:3000/api/course/type/' + courseId + '/checkType', {
      headers: {
        'content-type': 'application/json'
      },
      method: 'GET',
      credentials: 'include'
    })
      .then(response => {
        console.log(response);
        return response.json();
      });
  }
}
