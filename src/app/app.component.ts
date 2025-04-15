import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <h1>Bem-vindo ao Blog Pessoal</h1>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule]
})
export class AppComponent {}
