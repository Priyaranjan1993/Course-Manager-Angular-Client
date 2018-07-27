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

  fetchSectionForCourse(courseId) {
    return fetch('http://localhost:3000/api/course/courseId/section'.replace('courseId', courseId))
      .then(response => response.json());
  }

  updateSectionForCourse(sectionId, data) {
    return fetch('http://localhost:3000/api/section/sectionId'.replace('sectionId', sectionId), {
      headers: {
        'content-type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify({
        sectionName: data.sectionName, maxSeats: data.maxSeats,
        availableSeats: data.availableSeats, courseId: data.courseId, sectionId: data.sectionId
      }),
      credentials: 'include'
    })
      .then(response => {
        console.log(response);
        return response.json();
      });
  }

  deleteSectionForCourse(sectionId) {
    return fetch('http://localhost:3000/api/section/sectionId'.replace('sectionId', sectionId), {
      method: 'DELETE'
    })
      .then(response => {
        console.log(response);
        return response.json();
      });
  }

  addSectionForCourse(courseId, data) {
    return fetch('http://localhost:3000/api/course/courseId/section'.replace('courseId', courseId), {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        sectionName: data.sectionName, maxSeats: data.maxSeats,
        availableSeats: data.availableSeats, courseId: data.courseId
      }),
      credentials: 'include'
    })
      .then(response => {
        console.log(response);
        return response.json();
      });
  }
}
