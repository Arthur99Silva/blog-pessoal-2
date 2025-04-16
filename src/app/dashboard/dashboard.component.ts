import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { PostService, Post } from '../services/post.service'; // Verifique se o caminho está correto
import { CommonModule } from '@angular/common';
// Se for utilizar algum outro módulo (ex.: para formatação ou gráficos), importe-os aqui

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  posts: Post[] = [];
  postForm: FormGroup;
  isEditMode: boolean = false;
  editingPostId: number | null = null;

  constructor(private postService: PostService, private fb: FormBuilder) {
    // Cria o formulário com validações simples
    this.postForm = this.fb.group({
      titulo: ['', Validators.required],
      conteudo: ['', Validators.required],
      autor: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadPosts();
  }

  // Carrega os posts do backend chamando o serviço
  loadPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (data: Post[]) => {
        this.posts = data;
        console.log('Posts carregados:', this.posts);
      },
      error: (error) => console.error('Erro ao carregar posts:', error)
    });
  }

  // Método chamado ao submeter o formulário para criar ou atualizar
  onSubmit(): void {
    if (this.postForm.invalid) {
      return;
    }
    if (this.isEditMode && this.editingPostId !== null) {
      // Atualização de post
      const updatedPost: Post = { ...this.postForm.value };
      this.postService.updatePost(this.editingPostId, updatedPost).subscribe({
        next: () => {
          this.loadPosts();
          this.clearForm();
        },
        error: (error) => console.error('Erro ao atualizar post:', error)
      });
    } else {
      // Criação de novo post
      const newPost: Post = { ...this.postForm.value };
      this.postService.createPost(newPost).subscribe({
        next: () => {
          this.loadPosts();
          this.clearForm();
        },
        error: (error) => console.error('Erro ao criar post:', error)
      });
    }
  }

  // Prepara o formulário para edição, carregando os dados do post selecionado
  onEdit(post: Post): void {
    this.isEditMode = true;
    this.editingPostId = post.id || null;
    this.postForm.patchValue({
      titulo: post.titulo,
      conteudo: post.conteudo,
      autor: post.autor,
    });
  }

  // Chama o serviço para excluir o post
  onDelete(postId: number | undefined): void {
    if (!postId) return;
    this.postService.deletePost(postId).subscribe({
      next: () => this.loadPosts(),
      error: (error) => console.error('Erro ao excluir post:', error)
    });
  }

  // Limpa o formulário e sai do modo de edição
  clearForm(): void {
    this.postForm.reset();
    this.isEditMode = false;
    this.editingPostId = null;
  }
}
