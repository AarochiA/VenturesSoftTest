import { Injectable } from '@angular/core';
import { of, throwError, delay, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'jwt_token';
  private fakeUsers = [{ email: 'aarochia@gmail.com', password: 'aaa123' }];

  login(email: string, password: string) {
    const user = this.fakeUsers.find(
      (u) => u.email === email && u.password === password,
    );

    if (user) {
      const fakeToken =
        'fake-jwt-token-' + Math.random().toString(36).substring(2);

      return of({ token: fakeToken }).pipe(
        delay(1000),
        tap((res) => sessionStorage.setItem(this.tokenKey, res.token)),
      );
    } else {
      return throwError(() => new Error('Invalid credentials'));
    }
  }

  logout() {
    sessionStorage.removeItem(this.tokenKey);
  }

  getToken() {
    return sessionStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
