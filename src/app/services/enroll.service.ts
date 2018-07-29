import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EnrollService {

  constructor() {
  }

  enrollStudentForCourse(studentId, sectionId) {
    return fetch('http://localhost:3000/api/student/' + studentId + '/section/' + sectionId, {
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

  unenrollStudentForCourse(studentId, sectionId) {
    return fetch('http://localhost:3000/api/student/' + studentId + '/section/' + sectionId, {
      headers: {
        'content-type': 'application/json'
      },
      method: 'DELETE',
      credentials: 'include'
    })
      .then(response => {
        console.log(response);
        return response.json();
      });
  }

  fetchEnrolledSection(studentId) {
    return fetch('http://localhost:3000/api/student/' + studentId + '/section', {
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
