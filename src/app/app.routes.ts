// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

export const routes: Routes = [
  // Redireciona a raiz para /dashboard
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

  // Rota para o Dashboard
  { path: 'dashboard', component: DashboardComponent },

  // Wildcard: qualquer outra rota volta para o dashboard
  { path: '**', redirectTo: 'dashboard' }
];
