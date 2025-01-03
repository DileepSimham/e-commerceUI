import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = 'http://localhost:8081/orders'; // Base URL for orders API

  constructor(private http: HttpClient) {}

  getOrdersByUsername(): Observable<any> {

      // Retrieve the user details from sessionStorage
      const userDetails = JSON.parse(window.sessionStorage.getItem("userdetails"));
        
      // Extract the email
      const email = userDetails ? userDetails.email : null;
  
      // Ensure the email is present
      if (!email) {
        throw new Error("User email is missing");
      }
    return this.http.get<any>(`${this.apiUrl}/${email}`);
  }
}
