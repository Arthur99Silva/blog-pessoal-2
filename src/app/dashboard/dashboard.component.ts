// src/app/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';

import { AuthService } from '../services/auth.service';
import { PostService, Post } from '../services/post.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgxChartsModule,
    MatCardModule,
    MatDividerModule,
    MatListModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  totalPosts = 0;
  postsByAuthor: { name: string; value: number }[] = [];
  recentPosts: Post[] = [];

  colorScheme: Color = {
    name: 'postsByAuthorScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#3f51b5', '#e91e63', '#009688', '#ff9800', '#9c27b0']
  };

  view: [number, number] = [700, 400];

  constructor(
    private auth: AuthService,
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Redireciona se não autenticado
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.postService.getAllPosts().subscribe(posts => {
      this.totalPosts = posts.length;

      const counts = posts.reduce((acc, p) => {
        acc[p.autor] = (acc[p.autor] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      this.postsByAuthor = Object.entries(counts)
        .map(([name, value]) => ({ name, value }));

      this.recentPosts = posts
        .sort((a, b) => new Date(b.data!).getTime() - new Date(a.data!).getTime())
        .slice(0, 5);
    });
  }
}
