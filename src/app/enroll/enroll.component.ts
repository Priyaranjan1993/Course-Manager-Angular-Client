import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../services/course.service';
import {EnrollService} from '../services/enroll.service';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-enroll',
  templateUrl: './enroll.component.html',
  styleUrls: ['./enroll.component.css']
})
export class EnrollComponent implements OnInit {
  sectionList = [];
  courseId;
  enrollResult;
  unenrollResult;
  userId;
  orgSectionList;
  enrolledSectionData = [];
  userName;

  constructor(private courseService: CourseService,
              private enrollService: EnrollService,
              private userService: UserService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('courseId');
    this.courseService.fetchSectionForCourse(this.courseId)
      .then((data) => {
        this.sectionList = data;
        this.orgSectionList = data;
      }).then(() => {
      this.getUserId();
    });
  }

  getUserId() {
    this.userService.getUserId()
      .then(data => {
        this.userId = data._id;
      })
      .then(() => {
        this.fetchEnrolledSection();
      });
  }

  fetchEnrolledSection() {
    this.enrollService.fetchEnrolledSection(this.userId)
      .then(data => {
        console.log(data);
        if (data.length !== 0) {
          this.enrolledSectionData.push(data[0].section);
          this.sectionList = this.sectionList.filter((val) => {
            console.log(val);
            return val._id !== this.enrolledSectionData[0]._id;
          });
        }
        else {
          this.enrolledSectionData = [];
          this.sectionList = this.orgSectionList;
        }
      });
  }

  enrollStudent(sectionId) {
    this.enrollService.enrollStudentForCourse(this.userId, sectionId)
      .then(data => {
        this.enrollResult = data;
      })
      .then(() => {
        this.fetchEnrolledSection();
      });
  }

  unenrollStudent(sectionId) {
    this.enrollService.unenrollStudentForCourse(this.userId, sectionId)
      .then(data => {
        this.unenrollResult = data;
      })
      .then(() => {
        this.fetchEnrolledSection();
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
