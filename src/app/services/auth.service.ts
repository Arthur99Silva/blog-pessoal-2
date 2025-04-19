import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  public isLoggedIn$ = this._isLoggedIn.asObservable();

  // Chamado pelo LoginComponent
  login(username: string, password: string): Observable<boolean> {
    // stub: qualquer usuário/senha não vazios → sucesso
    const success = username.trim() !== '' && password.trim() !== '';
    return of(success).pipe(
      delay(500), // simula latência
      tap(ok => {
        if (ok) {
          // aqui você poderia salvar um token real
          localStorage.setItem('AUTH_TOKEN', 'fake-jwt-token');
          this._isLoggedIn.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('AUTH_TOKEN');
    this._isLoggedIn.next(false);
  }

  // Depois, você pode trocar para verificar token real
  isAuthenticated(): boolean {
    return localStorage.getItem('AUTH_TOKEN') != null;
  }
}
