import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Order } from '../components/model/order.model';
import { StripeResponse } from '../components/model/stripe-response.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:8081/api/orders'; // Update this URL as needed

  constructor(private http: HttpClient) {}

  // getOrdersByEmail(userEmail: string): Observable<Order[]> {
  //   console.log("hello");
  //   return this.http.get<Order[]>(`${this.apiUrl}/by-email?userEmail=${userEmail}`);
  // }

  /*

    this api makes call to backend for make payment and will get stripe resoponse .
    after that it will we redirected to stripe payment page..once done,
    it will come to track-order page.
  */
  makePayment(productId: number, quantity: number): Observable<StripeResponse> {
    // Retrieve the user details from sessionStorage
    const userDetails = JSON.parse(
      window.sessionStorage.getItem('userdetails')
    );

    // Extract the email
    const email = userDetails ? userDetails.email : null;

    // Ensure the email is present
    if (!email) {
      throw new Error('User email is missing');
    }

    // Make the POST request to the backend with the correct URL
    return this.http.post<StripeResponse>(
      `${this.apiUrl}/makePayment?productId=${productId}&userEmail=${email}&quantity=${quantity}`,
      {}
    );
  }
}
