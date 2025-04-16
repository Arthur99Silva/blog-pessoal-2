import { Component, OnInit } from '@angular/core';
import { PostService, Post } from '../services/post.service'; // ajuste o caminho se necessário
import { NgxChartsModule } from '@swimlane/ngx-charts'; // Caso use gráficos

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgxChartsModule], // importe outros módulos necessários
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  posts: Post[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  // Método para carregar os posts do backend
  loadPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (data: Post[]) => {
        this.posts = data;
        console.log('Posts carregados:', this.posts);
      },
      error: (error) => {
        console.error('Erro ao carregar posts:', error);
      }
    });
  }
}
