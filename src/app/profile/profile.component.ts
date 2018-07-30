import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MAT_SNACK_BAR_DATA
} from '@angular/material';
import {NotificationComponent} from '../login/login.component';

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

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.userInfo = this.route.snapshot.paramMap.get('username');
    console.log('My passed data ---' + this.userInfo);
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

  getProfile(username) {
    this.userService.getProfile(username)
      .then((response) => {
        console.log('profile data --- ' + response);
        this.profile.firstName = response.firstName;
        this.profile.lastName = response.lastName;
        this.profile.email = response.email;
        this.profile.phone = response.mobile;
        this.profile.address = response.address;
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
