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
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../services/auth.service';
import { PostService, Post } from '../services/post.service';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

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
    MatChipsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatDialogModule,
    MatTooltipModule
  ],
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  authors: string[] = [];
  themes: string[] = [];

  titleFilter = new FormControl('');
  authorFilter = new FormControl('');
  themeFilter = new FormControl('');
  loading = false;

  constructor(
    private auth: AuthService,
    private postService: PostService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }

    this.titleFilter.valueChanges.subscribe(() => this.applyFilters());
    this.authorFilter.valueChanges.subscribe(() => this.applyFilters());
    this.themeFilter.valueChanges.subscribe(() => this.applyFilters());
    this.loadPosts();
  }

  private loadPosts(): void {
    this.loading = true;
    this.postService.getAllPosts().subscribe({
      next: posts => {
        this.posts = posts.sort((a, b) => 
          new Date(b.data!).getTime() - new Date(a.data!).getTime()
        );
        this.authors = Array.from(new Set(posts.map(p => p.autor))).sort();
        this.themes = Array.from(new Set(posts.map(p => p.tema))).sort();
        this.applyFilters();
        this.loading = false;
      },
      error: () => {
        this.snackBar.open('Erro ao carregar postagens', 'Fechar', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  private applyFilters(): void {
    const title = this.titleFilter.value?.toLowerCase() || '';
    const author = this.authorFilter.value || '';
    const theme = this.themeFilter.value || '';

    this.filteredPosts = this.posts.filter(p => {
      const matchesTitle = p.titulo.toLowerCase().includes(title);
      const matchesAuthor = author ? p.autor === author : true;
      const matchesTheme = theme ? p.tema === theme : true;
      
      return matchesTitle && matchesAuthor && matchesTheme;
    });
  }

  onEdit(id: number | undefined): void {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/login']);
      return;
    }
    if (id != null) {
      this.router.navigate(['/posts/edit', id]);
    }
  }

  onDelete(id: number | undefined): void {
    if (!this.auth.isAuthenticated() || id == null) {
      this.router.navigate(['/login']);
      return;
    }

    this.dialog
      .open(ConfirmDialogComponent, {
        data: {
          title: 'Confirmar exclusão?',
          message: 'Deseja realmente excluir este post?'
        }
      })
      .afterClosed()
      .subscribe(confirmed => {
        if (!confirmed) return;

        this.loading = true;
        this.postService.deletePost(id).subscribe({
          next: () => this.loadPosts(),
          error: () => {
            this.snackBar.open('Erro ao excluir post', 'Fechar', { duration: 3000 });
            this.loading = false;
          }
        });
      });
  }
}