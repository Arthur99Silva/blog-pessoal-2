import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

// Defina as rotas do seu aplicativo aqui
export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  // { path: 'outro-caminho', component: OutroComponent },
];
