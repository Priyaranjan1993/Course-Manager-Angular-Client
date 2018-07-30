import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {EnrollService} from '../services/enroll.service';
import {CourseService} from '../services/course.service';

import {
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MAT_SNACK_BAR_DATA
} from '@angular/material';
import {NotificationComponent} from '../login/login.component';
import {CourseTypeService} from '../services/course-type.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  };

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  userInfo;
  userId;
  courseList;
  courseMap = [];
  enrolledList = [];

  constructor(private userService: UserService, private router: Router,
              private enrollService: EnrollService, private courseService: CourseService,
              private route: ActivatedRoute, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.userInfo = this.route.snapshot.paramMap.get('username');
    console.log('My passed data ---' + this.userInfo);
    this.courseService.fetchCourses()
      .then(() => {
        this.courseList = this.courseService.courseDetails;
      }).then(() => {
      this.courseList.forEach((course) => {
        this.courseMap[course.id] = course.title;
      });
    });
    this.profile.username = this.userInfo;
    this.getProfile(this.profile.username);
  }

  saveProfile(profile) {
    this.userService.updateProfile(profile)
      .then((response) => {
        console.log('profile --- ' + response);
        this.openSnackBar();
      });
  }

  fetchEnrolledData() {
    this.enrollService.fetchEnrolledSection(this.userId)
      .then(response => {
        console.log(response);
        this.enrolledList = response;
      });
  }

  getProfile(username) {
    this.userService.getProfile(username)
      .then((response) => {
        console.log('profile data --- ' + response);
        this.profile.firstName = response.firstName;
        this.profile.lastName = response.lastName;
        this.profile.email = response.email;
        this.profile.phone = response.mobile;
        this.profile.address = response.address;
        this.userId = response._id;
      })
      .then(() => {
        this.fetchEnrolledData();
      });
  }

  logout() {
    this.userService.logout()
      .then(() => {
        console.log('Logged out');
        this.router.navigate(['/login']);
      });
  }

  openSnackBar() {
    this.snackBar.openFromComponent(NotificationProfileComponent, {
      duration: 6000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: 'profile'
    });
  }
}


@Component({
  selector: 'app-login-alert',
  templateUrl: '../notifications/Alert/alert.html',
  styles: [`
    .example-pizza-party {
      color: white;
    }

    #success-sign {
      position: relative;
      top: 4px;
      margin: 0 8px 0 0px;
      color: green;
      font-size: 19px;
    }
  `],
})

export class NotificationProfileComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }
}
