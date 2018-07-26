import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courseDetails;

  constructor() {
  }

  fetchCourses() {
    return fetch('https://shrouded-lowlands-37542.herokuapp.com/api/course')
      .then(courses => {
        console.log(courses);
        return courses.json();
      })
      .then(data => {
        console.log(data);
        this.courseDetails = data;
      });
  }

  fetchWidgets(lessonId) {
    return fetch('https://shrouded-lowlands-37542.herokuapp.com/api/lesson/lessonId/widget'.replace('lessonId', lessonId))
      .then(response => response.json());
  }
}
