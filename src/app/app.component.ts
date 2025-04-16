// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <header>
      <nav>
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      </nav>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule]
})
export class AppComponent {}
