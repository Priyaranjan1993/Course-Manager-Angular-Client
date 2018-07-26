import {Component, OnInit} from '@angular/core';
import {CourseService} from '../services/course.service';
import {UserService} from '../services/user.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  courseList;

  constructor(private courseService: CourseService, private userService: UserService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.courseService.fetchCourses()
      .then(() => {
        this.courseList = this.courseService.courseDetails;
      });
  }

  logout() {
    this.userService.logout()
      .then(() => {
        console.log('Logged out');
        this.router.navigate(['/login']);
      });
  }

  view() {

  }


}
