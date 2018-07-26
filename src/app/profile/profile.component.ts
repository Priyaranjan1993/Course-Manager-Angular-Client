import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';
import {ActivatedRoute} from '@angular/router';

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

  userInfo;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) {
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
      });
  }

  getProfile(username) {
    this.userService.getProfile(username)
      .then((response) => {
        console.log('profile data --- ' + response);
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
