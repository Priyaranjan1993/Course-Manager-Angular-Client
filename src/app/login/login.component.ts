import {Component, OnInit, Inject} from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {
  MatSnackBar, MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
  MAT_SNACK_BAR_DATA
} from '@angular/material';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: boolean;
  register: boolean;
  xx = this;
  user = {
    username: '',
    password: '',
    regUsername: '',
    regPassword: '',
    regConfirmPassword: ''
  };
  userNamePresent = false;
  mismatchPassword = true;

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private userService: UserService, private router: Router, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.login = true;
    this.register = false;
  }

  showLogin() {
    $('#signIn').click(() => {
      this.login = true;
      this.register = false;
      $('#signIn').removeClass('inactive underlineHover');
      $('#signIn').addClass('active');
      $('#register').removeClass('active');
      $('#register').addClass('inactive underlineHover');
    });
  }

  showRegister() {
    $('#register').click(() => {
      this.login = false;
      this.register = true;
      $('#register').removeClass('inactive underlineHover');
      $('#register').addClass('active');
      $('#signIn').removeClass('active');
      $('#signIn').addClass('inactive underlineHover');
    });
  }

  loginUser(user) {
    this.userService.loginUser(user)
      .then((userResponse) => {
        console.log(userResponse);
        if (userResponse === null) {
          this.openSnackBar();
        } else {
          if (userResponse.role === 'admin') {
            this.router.navigate(['/admin', {username: userResponse.userName}]);
          } else if (userResponse.role === 'faculty') {
            this.router.navigate(['/faculty', {username: userResponse.userName}]);
          } else {
            this.router.navigate(['/profile', {username: userResponse.userName}]);
          }
        }


      });
  }

  registerUser(user) {

    this.userService.checkUserName(this.user.regUsername)
      .then((res) => {
        if (res !== null) {
          this.userNamePresent = true;
        } else {
          this.userService.registerUser(this.user, 'student')
            .then((response) => {
              console.log(response);
              console.log('registered');
              this.router.navigate(['/profile', {username: response.userName}]);
            });
        }
      });
  }

  checkValid(user, touched) {
    if (touched) {
      if (user.regPassword !== user.regConfirmPassword) {
        this.mismatchPassword = true;
        return true;
      } else {
        this.mismatchPassword = false;
        return false;
      }
    }
  }

  openSnackBar() {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: 6000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      data: 'login'
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

    #error-sign {
      position: relative;
      top: 4px;
      margin: 0 8px 0 0px;
      color: red;
      font-size: 19px;
    }
  `],
})

export class NotificationComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) {
  }
}
