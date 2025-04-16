// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <header>
      <nav>
        <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a> |
        <a routerLink="/posts"   routerLinkActive="active">Listar Posts</a> |
        <a routerLink="/posts/create" routerLinkActive="active">Criar Post</a>
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
