// profile.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string | null = null;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    // pega o nome atual
    this.username = this.auth.getUsername();
    // ou, se preferir atualização reativa:
    // this.auth.currentUser$.subscribe(u => this.username = u);
  }
}
