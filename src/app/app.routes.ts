import { Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent }  from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostListComponent }  from './post-list/post-list.component';
import { PostFormComponent }  from './post-form/post-form.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login',  component: LoginComponent },
  { path: '', redirectTo: 'signup', pathMatch: 'full' },

  // Roteamento protegido
  { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'posts',          component: PostListComponent,  canActivate: [AuthGuard] },
  { path: 'posts/create',   component: PostFormComponent,  canActivate: [AuthGuard] },
  { path: 'posts/edit/:id', component: PostFormComponent,  canActivate: [AuthGuard] },

  { path: '**', redirectTo: 'dashboard' }
];
