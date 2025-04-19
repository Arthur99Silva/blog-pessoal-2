// src/app/dashboard/dashboard.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { PostService, Post } from '../services/post.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
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

  // Definição do esquema de cores compatível com a interface Color e ScaleType enum
  colorScheme: Color = {
    name: 'postsByAuthorScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#3f51b5', '#e91e63', '#009688', '#ff9800', '#9c27b0']
  };

  // Tamanho do gráfico [largura, altura]
  view: [number, number] = [700, 400];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(posts => {
      // 1) Total de postagens
      this.totalPosts = posts.length;

      // 2) Agrupa as postagens por autor
      const counts = posts.reduce((acc, p) => {
        acc[p.autor] = (acc[p.autor] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      this.postsByAuthor = Object.entries(counts)
        .map(([name, value]) => ({ name, value }));

      // 3) As 5 últimas postagens pela data
      this.recentPosts = posts
        .sort((a, b) => new Date(b.data!).getTime() - new Date(a.data!).getTime())
        .slice(0, 5);
    });
  }
}
