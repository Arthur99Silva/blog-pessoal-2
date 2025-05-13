// signup.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

// Lottie
import { LottieComponent, AnimationOptions } from 'ngx-lottie';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-signup',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    LottieComponent
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  hide = true;
  error: string | null = null;

  // Lottie config
  lottieConfig: AnimationOptions = {
    path: 'assets/animation.json',
    loop: true,
    autoplay: true
  };

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username:        ['', Validators.required],
      password:        ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  private passwordMatchValidator(form: AbstractControl) {
    const pass    = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.signupForm.invalid) return;
    const { username, password } = this.signupForm.value;
    this.auth.register(username, password).subscribe(success => {
      if (success) {
        this.snack.open('Cadastro realizado! Faça login.', 'Ok', { duration: 3000 });
        this.router.navigate(['/login']);
      } else {
        this.error = 'Erro no cadastro';
        this.snack.open(this.error, 'Fechar', { duration: 3000 });
      }
    });
  }
}
