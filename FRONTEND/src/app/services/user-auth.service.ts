import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { Users } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private apiUrl = 'http://localhost:443/api/utilisateur'; 
  private currentUserSubject: BehaviorSubject<Users | null> = new BehaviorSubject<Users | null>(null);
  public currentUser: Observable<Users | null> = this.currentUserSubject.asObservable();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient, private router: Router) {}

  register(user: Users): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(loginData: { login: string, password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData).pipe(
      tap((response: any) => {
        this.setUserData(response.user);
      })
    );
  }

  logout(): void {
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    localStorage.removeItem('currentUser'); // Supprimez les données utilisateur du localStorage
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
}

  private setUserData(user: Users): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  isAuthenticated(): Observable<boolean> {
    return this.currentUser.pipe(map(user => !!user));
  }
}