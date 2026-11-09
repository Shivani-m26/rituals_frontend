import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = '/api/auth';
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) { }

  private hasToken(): boolean {
    const token = this.getToken();
    return !!token;
  }

  isLoggedIn$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  register(userData: any): Observable<any> {
    const payload = {
      ...userData,
      email: userData?.email ? userData.email.trim().toLowerCase() : ''
    };
    return this.http.post(`${this.apiUrl}/register`, payload).pipe(
      tap((res: any) => this.handleAuthSuccess(res))
    );
  }

  login(credentials: any): Observable<any> {
    const payload = {
      ...credentials,
      email: credentials?.email ? credentials.email.trim().toLowerCase() : ''
    };
    return this.http.post(`${this.apiUrl}/login`, payload).pipe(
      tap((res: any) => this.handleAuthSuccess(res))
    );
  }

  forgotPassword(email: string): Observable<any> {
    const normalizedEmail = email ? email.trim().toLowerCase() : '';
    return this.http.post(`${this.apiUrl}/forgot-password`, { email: normalizedEmail });
  }

  resetPassword(data: { email: string, token: string, newPassword: string }): Observable<any> {
    const payload = {
      ...data,
      email: data?.email ? data.email.trim().toLowerCase() : '',
      token: data?.token ? data.token.trim() : ''
    };
    return this.http.post(`${this.apiUrl}/reset-password`, payload);
  }

  getProfile(): Observable<any> {
    return this.http.get(`${this.apiUrl}/me`);
  }

  private handleAuthSuccess(response: any): void {
    if (response?.jwt) {
      localStorage.setItem('token', response.jwt);
      localStorage.setItem('user', JSON.stringify({
        id: response.id,
        username: response.username,
        points: response.totalPoints ?? 0
      }));
      this.loggedIn.next(true);
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    if (!token || token === 'null' || token === 'undefined' || token.trim() === '') {
      return null;
    }
    return token;
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  getCurrentUser(): any {
    try {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    } catch {
      return null;
    }
  }
}
