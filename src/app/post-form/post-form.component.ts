import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { PostService, Post } from '../services/post.service';

@Component({
  standalone: true,
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
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
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      conteudo: ['', Validators.required],
      autor: ['', Validators.required]
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.postId = +id;
        this.postService.getAllPosts().subscribe(posts => {
          const post = posts.find(p => p.id === this.postId);
          if (post) this.form.patchValue(post);
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const data = this.form.value as Post;
    const action = this.isEdit && this.postId != null
      ? this.postService.updatePost(this.postId, data)
      : this.postService.createPost(data);

    action.subscribe(() => this.router.navigate(['/posts']));
  }
}
