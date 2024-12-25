import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../components/model/cart.model';
import { Product } from '../components/model/product.model';

import { map } from 'rxjs/operators';
import { StripeResponse } from '../components/model/stripe-response.model';


@Injectable({
    providedIn: 'root'
})
export class CartService {

    private apiUrl = "http://localhost:8081/api/cart"; // Replace with your Spring Boot API URL

    constructor(private http: HttpClient) { }

    // Add product to the cart
    addToCart(productId: number): Observable<Cart> {
        console.log(productId)
        // Retrieve the user details from sessionStorage
        const userDetails = JSON.parse(window.sessionStorage.getItem("userdetails"));

        // Extract the email
        const email = userDetails ? userDetails.email : null;

        console.log(email); // It will log "simhamdileepkumar@gmail.com" if it exists

        return this.http.post<Cart>(`${this.apiUrl}/add?productId=${productId}&user=${email}`, {});
    }

    getCart(): Observable<Cart> {

        const userDetails = JSON.parse(window.sessionStorage.getItem("userdetails"));

        // Extract the email
        const email = userDetails ? userDetails.email : null;

        return this.http.get<Product[]>(`${this.apiUrl}/products/${email}`).pipe(
            map((products: Product[]) => {
                // Wrap the array of products into a Cart object
                return { products: products };
            })
        );
    }
    

    // Remove product from cart
    removeFromCart(productId: number): Observable<Cart> {

          // Retrieve the user details from sessionStorage
          const userDetails = JSON.parse(window.sessionStorage.getItem("userdetails"));

          // Extract the email
          const email = userDetails ? userDetails.email : null;

        return  this.http.post<Cart>(`${this.apiUrl}/remove?productId=${productId}&user=${email}`, {});
    }
    checkout(): Observable<any> {
        // Retrieve the user details from sessionStorage
        const userDetails = JSON.parse(window.sessionStorage.getItem("userdetails"));
    
        // Extract the email
        const email = userDetails ? userDetails.email : null;
    
        // Ensure the email is present
        if (!email) {
            throw new Error("User email is missing");
        }
    
        // Make the POST request to the backend with the correct URL
        return this.http.post<any>(`${this.apiUrl}/checkout/${email}`, {});
    }

    checkout2(): Observable<StripeResponse> {
        // Retrieve the user details from sessionStorage
        const userDetails = JSON.parse(window.sessionStorage.getItem("userdetails"));
        
        // Extract the email
        const email = userDetails ? userDetails.email : null;
    
        // Ensure the email is present
        if (!email) {
          throw new Error("User email is missing");
        }
    
        // Make the POST request to the backend with the correct URL
        return this.http.post<StripeResponse>(`${this.apiUrl}/checkout2/${email}`, {});
      }
    
}
