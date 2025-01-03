import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../components/model/product.model";



@Injectable({
    providedIn: 'root'
})
export class ProductService {

    private apiUrl = 'http://localhost:8081/api/products'; // Replace with your actual API URL

    private orderApiUrl = 'http://localhost:8081/api/orders/place'; // Your Order API URL

    constructor(private http: HttpClient) { }

    getProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(this.apiUrl);
    }

    addToCart(product: Product): void {
        // Implement your cart logic here
        console.log('Added to cart:', product);
    }

    getProductById(id: number): Observable<Product> {
        const url = `${this.apiUrl}/${id}`;
        return this.http.get<Product>(url);
    }

    // placeOrder(productId: number, userEmail: string, quantity: number): Observable<any> {
    //     const params = new HttpParams()
    //       .set('productId', productId.toString())
    //       .set('userEmail', userEmail)
    //       .set('quantity', quantity.toString());
    //     return this.http.post<any>(this.orderApiUrl, null, { params });
    //   }
    

   
}