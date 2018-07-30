import {Component, OnInit} from '@angular/core';
import {CourseService} from '../services/course.service';
import {UserService} from '../services/user.service';
import {CourseTypeService} from '../services/course-type.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.css']
})
export class FacultyComponent implements OnInit {
  courseList;
  type = [];

  constructor(private courseService: CourseService, private userService: UserService,
              private courseTypeService: CourseTypeService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.courseService.fetchCourses()
      .then(() => {
        this.courseList = this.courseService.courseDetails;
      })
      .then(() => {
        this.courseList.forEach((course) => {
          this.courseTypeService.checkType(course.id)
            .then(data => {
              console.log('Type is --- ' + data.type);
              this.type[course.id] = data.type;
            });
        });
      })
      .then(() => {
        this.userService.setUserName();
      });
  }

  navigateProfile() {
    this.router.navigate(['/profile', {username: this.userService.userName}]);
  }

  logout() {
    this.userService.logout()
      .then(() => {
        console.log('Logged out');
        this.router.navigate(['/login']);
      });
  }

  makePrivate(courseId) {
    this.courseTypeService.makePrivate(courseId)
      .then(response => {
        this.courseTypeService.checkType(courseId)
          .then(data => {
            console.log('Type is -- ' + data.type);
            this.type[courseId] = data.type;
          });
      });
  }

  makePublic(courseId) {
    this.courseTypeService.makePublic(courseId)
      .then(response => {
        this.courseTypeService.checkType(courseId)
          .then(data => {
            console.log('Type is --- ' + data.type);
            this.type[courseId] = data.type;
          });
      });
  }


}
