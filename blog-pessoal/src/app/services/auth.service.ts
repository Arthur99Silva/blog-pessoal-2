import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

export interface UserProfile {
  username: string;
  email?: string | null;
  avatar?: string | null;    // base64 ou URL
  fullName?: string | null;  // nome completo
  about?: string | null;     // sobre mim
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedIn.asObservable();

  private _userProfile = new BehaviorSubject<UserProfile | null>(null);
  public userProfile$ = this._userProfile.asObservable();

  constructor() {
    const stored = localStorage.getItem('USER_PROFILE');
    if (stored) {
      this._userProfile.next(JSON.parse(stored));
      this._isLoggedIn.next(true);
    }
  }

  register(username: string, password: string): Observable<boolean> {
    const ok = username.trim() !== '' && password.trim() !== '';
    return of(ok).pipe(
      delay(500),
      tap(success => {
        if (success) {
          localStorage.setItem('USER_CRED', JSON.stringify({ username, password }));
          const profile: UserProfile = {
            username,
            email: null,
            avatar: null,
            fullName: null,
            about: null
          };
          localStorage.setItem('USER_PROFILE', JSON.stringify(profile));
          this._userProfile.next(profile);
        }
      })
    );
  }

  login(username: string, password: string): Observable<boolean> {
    const storedCred = localStorage.getItem('USER_CRED');
    let valid = false;
    if (storedCred) {
      const creds = JSON.parse(storedCred);
      valid = creds.username === username && creds.password === password;
    }
    return of(valid).pipe(
      delay(500),
      tap(success => {
        if (success) {
          const profileStored = localStorage.getItem('USER_PROFILE');
          let profile: UserProfile;
          if (profileStored) {
            profile = JSON.parse(profileStored);
          } else {
            profile = {
              username,
              email: null,
              avatar: null,
              fullName: null,
              about: null
            };
            localStorage.setItem('USER_PROFILE', JSON.stringify(profile));
          }
          this._userProfile.next(profile);
          this._isLoggedIn.next(true);
        }
      })
    );
  }

  logout(): void {
    this._isLoggedIn.next(false);
    this._userProfile.next(null);
  }

  isAuthenticated(): boolean {
    return this._isLoggedIn.value;
  }

  /** Agora recebe também nome completo e sobre mim */
  updateProfile(
    email: string | null,
    avatarBase64: string | null,
    fullName: string | null,
    about: string | null
  ): void {
    const current = this._userProfile.value;
    if (!current) return;
    const updated: UserProfile = {
      ...current,
      email,
      avatar: avatarBase64,
      fullName,
      about
    };
    localStorage.setItem('USER_PROFILE', JSON.stringify(updated));
    this._userProfile.next(updated);
  }

  getUsername(): string | null {
    return this._userProfile.value?.username ?? null;
  }
}
