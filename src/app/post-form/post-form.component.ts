import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { PostService, Post } from '../services/post.service';

@Component({
  standalone: true,
  selector: 'app-post-form',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './post-form.component.html'
})
export class PostFormComponent implements OnInit {
  form!: FormGroup;
  isEdit = false;
  postId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicializa o formulário aqui
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      conteudo: ['', Validators.required],
      autor: ['', Validators.required]
    });

    // Se vier um parâmetro "id", estamos em modo de edição
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.postId = +id;
        // Carrega dados do post para editar
        this.postService.getAllPosts().subscribe(posts => {
          const post = posts.find(p => p.id === this.postId);
          if (post) {
            this.form.patchValue({
              titulo: post.titulo,
              conteudo: post.conteudo,
              autor: post.autor
            });
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value as Post;  // cast para Post
    if (this.isEdit && this.postId != null) {
      this.postService.updatePost(this.postId, data).subscribe(() => {
        this.router.navigate(['/posts']);
      });
    } else {
      this.postService.createPost(data).subscribe(() => {
        this.router.navigate(['/posts']);
      });
    }
  }
}
