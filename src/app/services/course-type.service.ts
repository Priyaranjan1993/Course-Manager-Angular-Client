import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseTypeService {

  constructor() {
  }

  makeAllCoursesPublic(courseId) {
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
}
