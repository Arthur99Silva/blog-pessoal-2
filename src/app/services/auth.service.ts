import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

interface Credentials { username: string; password: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  // sinaliza se está logado
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedIn.asObservable();

  // guarda o nome do usuário
  private _currentUser = new BehaviorSubject<string | null>(null);
  public currentUser$ = this._currentUser.asObservable();

  constructor() {
    // ao recarregar, restaura estado
    const storedUser = localStorage.getItem('AUTH_TOKEN');
    if (storedUser) {
      this._isLoggedIn.next(true);
      this._currentUser.next(storedUser);
    }
  }

  register(username: string, password: string): Observable<boolean> {
    const ok = username.trim() !== '' && password.trim() !== '';
    return of(ok).pipe(
      delay(500),
      tap(success => {
        if (success) {
          const creds: Credentials = { username, password };
          localStorage.setItem('USER_CRED', JSON.stringify(creds));
        }
      })
    );
  }

  login(username: string, password: string): Observable<boolean> {
    const stored = localStorage.getItem('USER_CRED');
    let valid = false;
    if (stored) {
      const creds: Credentials = JSON.parse(stored);
      valid = creds.username === username && creds.password === password;
    }
    return of(valid).pipe(
      delay(500),
      tap(success => {
        if (success) {
          localStorage.setItem('AUTH_TOKEN', username);
          this._isLoggedIn.next(true);
          this._currentUser.next(username);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('AUTH_TOKEN');
    this._isLoggedIn.next(false);
    this._currentUser.next(null);
  }

  isAuthenticated(): boolean {
    return this._isLoggedIn.value;
  }

  /** Retorna o nome do usuário logado (ou null) */
  getUsername(): string | null {
    return this._currentUser.value;
  }
}
