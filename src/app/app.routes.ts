// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostFormComponent } from './post-form/post-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'posts', component: PostListComponent },
  { path: 'posts/create', component: PostFormComponent },
  { path: 'posts/edit/:id', component: PostFormComponent },
  { path: '**', redirectTo: 'dashboard' }
];
