import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { PostService, Post } from '../services/post.service';

@Component({
  standalone: true,
  selector: 'app-post-list',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  authors: string[] = [];

  titleFilter = new FormControl('');
  authorFilter = new FormControl('');

  loading = false;

  constructor(
    private postService: PostService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // sempre que o filtro mudar, reaplica
    this.titleFilter.valueChanges.subscribe(() => this.applyFilter());
    this.authorFilter.valueChanges.subscribe(() => this.applyFilter());

    this.loadPosts();
  }

  private loadPosts(): void {
    this.loading = true;
    this.postService.getAllPosts().subscribe({
      next: posts => {
        this.loading = false;
        this.posts = posts;
        // lista única de autores
        this.authors = Array.from(new Set(posts.map(p => p.autor))).sort();
        this.applyFilter();
      },
      error: err => {
        this.loading = false;
        console.error(err);
        this.snackBar.open('Erro ao carregar postagens', 'Fechar', { duration: 3000 });
      }
    });
  }

  private applyFilter(): void {
    const title = this.titleFilter.value?.toLowerCase() || '';
    const author = this.authorFilter.value || '';

    this.filteredPosts = this.posts.filter(p => {
      const matchesTitle = p.titulo.toLowerCase().includes(title);
      const matchesAuthor = author ? p.autor === author : true;
      return matchesTitle && matchesAuthor;
    });
  }

  onEdit(id: number | undefined): void {
    if (id != null) this.router.navigate(['/posts/edit', id]);
  }

  onDelete(id: number | undefined): void {
    if (id == null) return;
    if (!confirm('Confirma exclusão deste post?')) return;

    this.loading = true;
    this.postService.deletePost(id).subscribe({
      next: () => {
        this.snackBar.open('Post excluído', 'Fechar', { duration: 2000 });
        this.loadPosts();
      },
      error: err => {
        this.loading = false;
        console.error(err);
        this.snackBar.open('Erro ao excluir post', 'Fechar', { duration: 3000 });
      }
    });
  }
}
