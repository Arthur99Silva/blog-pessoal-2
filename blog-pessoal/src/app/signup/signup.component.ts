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

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule
  ]
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  hide = true;                // controla mostrar/ocultar senha
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private snack: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }

  /** Validador que garante que password === confirmPassword */
  passwordsMatchValidator(form: AbstractControl) {
    const pass = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  onSubmit() {
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
