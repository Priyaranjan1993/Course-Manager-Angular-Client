import {Component, OnInit} from '@angular/core';
import {CourseService} from '../services/course.service';
import {UserService} from '../services/user.service';
import {CourseTypeService} from '../services/course-type.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courseList;
  userName;

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
          this.courseTypeService.makePublic(course.id)
            .then(response => {
              console.log(response);
            });
        });
      })
      .then(() => {
        this.checkUserExists();
      });
  }

  checkUserExists() {
    this.userService.getUserId()
      .then(data => {
        if (data !== null) {
          this.userName = data.userName;
          console.log('Username --- ' + this.userName);
        } else {
          this.userName = '';
        }

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
