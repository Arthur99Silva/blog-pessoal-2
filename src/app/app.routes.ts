import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostFormComponent } from './post-form/post-form.component';
import { AuthGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  // A partir daqui, somente usuários autenticados acessam
  { path: '',   redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'posts',      component: PostListComponent, canActivate: [AuthGuard] },
  { path: 'posts/create', component: PostFormComponent, canActivate: [AuthGuard] },
  { path: 'posts/edit/:id', component: PostFormComponent, canActivate: [AuthGuard] },

  // Qualquer outra rota redireciona para login (ou dashboard)
  { path: '**', redirectTo: 'login' }
];
