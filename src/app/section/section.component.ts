import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../services/course.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  courseId;
  dataForCourse;
  dataForModules;
  dataForLessons;
  widgetList;
  userName;
  noWidgets;

  constructor(private route: ActivatedRoute, private router: Router,
              private userService: UserService, private courseService: CourseService) {
  }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.dataForCourse = this.courseService.courseDetails.filter(data => data.id == this.courseId);
    this.dataForModules = this.dataForCourse[0].modules;
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

  showWidgets(lessonId) {
    this.courseService.fetchWidgets(lessonId)
      .then(data => {
        console.log('widget data -- ' + data);
        this.widgetList = data;
        if (data.length === 0) {
          this.noWidgets = true;
        } else {
          this.noWidgets = false;
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
