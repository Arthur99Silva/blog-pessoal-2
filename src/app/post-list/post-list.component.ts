import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { PostService, Post } from '../services/post.service';

@Component({
  standalone: true,
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private postService: PostService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: data => this.posts = data,
      error: err => console.error('Erro ao carregar posts:', err)
    });
  }

  onEdit(id: number | undefined): void {
    if (id != null) {
      this.router.navigate(['/posts/edit', id]);
    }
  }

  onDelete(id: number | undefined): void {
    if (id != null && confirm('Confirma exclusão deste post?')) {
      this.postService.deletePost(id).subscribe({
        next: () => this.loadPosts(),
        error: err => console.error('Erro ao excluir post:', err)
      });
    }
  }
}
