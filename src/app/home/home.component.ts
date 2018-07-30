import {Component, OnInit} from '@angular/core';
import {CourseService} from '../services/course.service';
import {UserService} from '../services/user.service';
import {CourseTypeService} from '../services/course-type.service';
import {Router, ActivatedRoute} from '@angular/router';
import {EnrollService} from '../services/enroll.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courseList;
  orgCourseList;
  userName;
  type = [];
  enrolledList = [];
  userId;
  courseMap = [];
  temp;
  filterSection = [];
  filterCourse = [];
  difference = [];

  constructor(private courseService: CourseService, private userService: UserService,
              private courseTypeService: CourseTypeService,
              private route: ActivatedRoute, private router: Router,
              private enrollService: EnrollService) {
  }

  ngOnInit() {
    this.courseService.fetchCourses()
      .then(() => {
        this.courseList = this.courseService.courseDetails;
        this.orgCourseList = this.courseList;
      })
      /*      .then(() => {
              this.courseList.forEach((course) => {
                this.courseTypeService.makePublic(course.id)
                  .then(response => {
                    console.log(response);
                  });
              });
            })*/
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
        this.checkUserExists();
      })
      .then(() => {
        this.courseList.forEach((course) => {
          this.courseMap[course.id] = course.title;
        });
      });
  }

  checkUserExists() {
    this.userService.getUserId()
      .then(data => {
        if (data !== null) {
          this.userName = data.userName;
          this.userId = data._id;
          console.log('Username --- ' + this.userName);
        } else {
          this.userName = '';
        }

      })
      .then(() => {
        this.fetchEnrolledData();
      })
      .then(() => {
        this.userService.setUserName();
      });
  }

  navigateProfile() {
    this.router.navigate(['/profile', {username: this.userService.userName}]);
  }

  fetchEnrolledData() {
    this.enrollService.fetchEnrolledSection(this.userId)
      .then(response => {
        console.log(response);
        this.enrolledList = response;
      })
      .then(() => {
        this.enrolledList.forEach((data) => {
          this.filterSection.push(data.section.courseId);
        });
        this.courseList.forEach((data) => {
          this.filterCourse.push(data.id);
        });
      })
      .then(() => {
        console.log(this.filterSection);
        console.log(this.filterCourse);
        this.difference = this.filterCourse.filter(data => this.filterSection.indexOf(data) < 0);
        console.log(this.difference);
        this.courseList = [];
        this.orgCourseList.forEach((data) => {
          if (this.difference.indexOf(data.id) >= 0) {
            this.courseList.push(data);
          }
        });
        /*this.courseList.push();*/
        /*this.courseList = this.courseList.filter((data) => {
          console.log(data.id === this.difference[0]);
          return data.id === this.difference[0];
        });*/
        console.log(this.courseList);
      });
  }

  logout() {
    this.userService.logout()
      .then(() => {
        console.log('Logged out');
        this.router.navigate(['/login']);
      });
  }

}
