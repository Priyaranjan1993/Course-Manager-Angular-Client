import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {HomeComponent} from './home/home.component';
import {SectionComponent} from './section/section.component';
import {AdminComponent} from './admin/admin.component';

const routingPaths: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'home', component: HomeComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'course/:courseId', component: SectionComponent},
  {path: '**', component: LoginComponent}
];

export const RoutePath = RouterModule.forRoot(routingPaths);
