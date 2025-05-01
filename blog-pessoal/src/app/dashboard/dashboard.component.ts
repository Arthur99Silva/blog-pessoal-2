import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';           // ← import adicionado
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { AuthService } from '../services/auth.service';
import { PostService, Post } from '../services/post.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  imports: [
    CommonModule,
    RouterModule,                // ← adicionado aqui
    NgxChartsModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ]
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

  view: [number, number] = [500, 240];

  constructor(
    private auth: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    if (!this.auth.isAuthenticated()) return;

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
