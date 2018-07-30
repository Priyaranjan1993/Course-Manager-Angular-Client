import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {HomeComponent} from './home/home.component';
import {SectionComponent} from './section/section.component';
import {AdminComponent} from './admin/admin.component';
import { EnrollComponent } from './enroll/enroll.component';
import { FacultyComponent } from './faculty/faculty.component';

const routingPaths: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'home', component: HomeComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'faculty', component: FacultyComponent},
  {path: 'course/:courseId', component: SectionComponent},
  {path: 'course/enroll/:courseId', component: EnrollComponent},
  {path: '**', component: HomeComponent}
];

export const RoutePath = RouterModule.forRoot(routingPaths);
