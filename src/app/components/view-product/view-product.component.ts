import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../model/product.model';
import { CartService } from '../../services/cart.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Cart } from '../model/cart.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  product: Product | null = null;

  quantity: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,

    private cartService: CartService,
    private spinner: NgxSpinnerService,
    private orderService:OrderService
  ) { }

  ngOnInit(): void {
    const productId = this.route.snapshot.params['id'];
    this.productService.getProductById(productId).subscribe({
      next: (data) => this.product = data,
      error: (err) => console.error('Error fetching product:', err)
    });
  }


  // Add product to cart
  addToCart(product: Product): void {

    this.spinner.show()
    console.log(product)
    this.cartService.addToCart(product.id).subscribe(
      (cart: Cart) => {
        console.log('Product added to cart:', cart);
        // alert('Product added to cart!');
        this.spinner.hide()
      },
      (error) => {
        console.error('Error adding product to cart:', error);
        alert('Failed to add product to cart');
        this.spinner.hide();
      }
    );
  }


   /*

    this method makes call to backend for make payment and will get stripe resoponse .
    after that it will we redirected to stripe payment page..once done,
    it will come to track-order page.
  */
  orderProduct(productId:number): void {
    console.log(productId)
    this.spinner.show()
    this.orderService.makePayment(productId,this.quantity).subscribe(
      (response) => {
        // Log the response to the console
        console.log('Checkout response:', response);
  
        // Proceed with the successful checkout
        if (response.sessionUrl) {
          window.location.href = response.sessionUrl; // Redirect to the Stripe payment session
        }
        // this.spinner.hide()
  
      },
      (error) => {
        console.error('Error during checkout:', error);
      }
    );
  }
}
