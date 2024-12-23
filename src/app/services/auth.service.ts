import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Interface for the signup data (optional but useful for type checking)
export interface SignupData {
  username: string;
  password: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8081/api/users';  // Replace with your API URL

  constructor(private http: HttpClient) { }

  // POST method to send signup data to backend
  signup(userData: SignupData): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }
}
