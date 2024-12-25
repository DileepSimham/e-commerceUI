import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeycloakUser } from '../components/model/keycloakuser.model';
  // Import the KeycloakUser model

@Injectable({
  providedIn: 'root',
})
export class KeycloakUserService {

  private apiUrl = 'http://localhost:8081/api/users/allUsers'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Fetch users from the API
  getUsers(): Observable<KeycloakUser[]> {
    return this.http.get<KeycloakUser[]>(this.apiUrl);
  }
}
