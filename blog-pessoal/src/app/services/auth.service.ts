import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

interface Credentials { username: string; password: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedIn.asObservable();

  // Cadastro: guarda credenciais no localStorage
  register(username: string, password: string): Observable<boolean> {
    const success = username.trim() !== '' && password.trim() !== '';
    return of(success).pipe(
      delay(500),
      tap(ok => {
        if (ok) {
          const creds: Credentials = { username, password };
          localStorage.setItem('USER_CRED', JSON.stringify(creds));
        }
      })
    );
  }

  // Login: só funciona se coincidir com o cadastro
  login(username: string, password: string): Observable<boolean> {
    const stored = localStorage.getItem('USER_CRED');
    let success = false;
    if (stored) {
      const creds: Credentials = JSON.parse(stored);
      success = creds.username === username && creds.password === password;
    }
    return of(success).pipe(
      delay(500),
      tap(ok => {
        if (ok) {
          localStorage.setItem('AUTH_TOKEN', username);
          this._isLoggedIn.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('AUTH_TOKEN');
    this._isLoggedIn.next(false);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('AUTH_TOKEN') != null;
  }
}
