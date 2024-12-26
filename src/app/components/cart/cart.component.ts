import { Component, OnInit } from '@angular/core';
import { Cart } from '../model/cart.model';
import { CartService } from '../../services/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: Cart = { products: [] };
  total: number = 0;

  constructor(private cartService: CartService,private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadCart();
  }

  // Load user's cart
  loadCart(): void {
    this.cartService.getCart().subscribe(cart => {
      this.cart = cart;
      this.calculateTotal();
    });
  }

  // Remove product from cart
  removeProduct(productId: number): void {
    this.cartService.removeFromCart(productId).subscribe(() => {
      this.loadCart(); // Reload cart after removing product
    });
  }

  // Calculate total price of the cart
  calculateTotal(): void {
    this.total = this.cart.products.reduce((sum, product) => sum + (product.price || 0), 0);
  }

  checkout(): void {
    
    this.cartService.checkout().subscribe(response => {
      alert('Checkout successful!');
      this.cart = { products: [] }; // Clear cart after checkout
      this.total = 0;
    });
  }
  
  checkout2(): void {
    this.spinner.show()
    this.cartService.checkout2().subscribe(
      (response) => {
        // Log the response to the console
        console.log('Checkout response:', response);
  
        // Proceed with the successful checkout
        if (response.sessionUrl) {
          window.location.href = response.sessionUrl; // Redirect to the Stripe payment session
        }
        this.spinner.hide()
  
        // Call the checkout method after handling response
        // this.checkout(); // This will execute the checkout logic
  
      },
      (error) => {
        console.error('Error during checkout:', error);
      }
    );
  }
  

}
