import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';

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
  userNamePresent: boolean = false;
  mismatchPassword: boolean = true;

  constructor(private userService: UserService, private router: Router) {
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
        this.router.navigate(['/profile', {username: userResponse.userName}]);
      });
  }

  registerUser(user) {

    this.userService.checkUserName(this.user.regUsername)
      .then((res) => {
        if (res !== null) {
          this.userNamePresent = true;
        }
        else {
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
      }
      else {
        this.mismatchPassword = false;
        return false;
      }
    }
  }

}
