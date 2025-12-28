import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  register(name: string, email: string, password: string): Observable<any> {
    const body = { name, email, password };
    return this.http.post<User>(`${this.base}/users`, body);
  }

  login(email: string, password: string): boolean {
    const body = { email, password };
    this.http.post<LoginRes>(`${this.base}/auth/login`, body, { withCredentials: true }).subscribe((res) => {
      if (res && res.accessToken) {
        this.setToken(res.accessToken);
        return true;
      }
      return false;
    });
    return false;
  }

  logout(): Observable<any> {
    return this.http.post<string>(`${this.base}/auth/logout`, {}, { headers: {}, withCredentials: true }).pipe(
      tap(() => {
        localStorage.removeItem('accessToken');
      }));
  }

  refresh(): Observable<any> {
    return this.http.post<LoginRes>(`${this.base}/refresh`, {}, { withCredentials: true }).pipe(
      tap(res => {
        this.setToken(res.accessToken);
      })
    );
  }

  isLoggedIn(): boolean {
    // return !!this.getToken();
    return false;
  }

  setToken(token: string): void {
    localStorage.setItem('accessToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }
}
