import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

import { AuthService, UserProfile } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  avatarPreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    public auth: AuthService, // agora público para uso no template
    private snack: MatSnackBar
  ) {
    this.profileForm = this.fb.group({
      email: [''],
      avatar: [null]
    });
  }

  ngOnInit(): void {
    this.auth.userProfile$.subscribe((p: UserProfile | null) => {
      if (p) {
        this.profileForm.patchValue({
          email: p.email ?? ''
        });
        this.profileForm.patchValue({
          avatar: p.avatar ?? null
        });
        this.avatarPreview = p.avatar ?? null;
      }
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;
    const file = input.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.avatarPreview = base64;
      this.profileForm.patchValue({ avatar: base64 });
    };
    reader.readAsDataURL(file);
  }

  onSave(): void {
    const email: string | null = this.profileForm.value.email ?? null;
    const avatar: string | null = this.profileForm.value.avatar ?? null;
    this.auth.updateProfile(email, avatar);
    this.snack.open('Perfil atualizado!', 'Fechar', { duration: 2000 });
  }
}
