import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppUser } from '../model/app-user.mode';
import { Product } from '../model/product.model';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Cart } from '../model/cart.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {


  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.spinner.show(); // Show spinner
    this.productService.getProducts().subscribe(
      (products) => {
        this.products = products;
        this.spinner.hide(); // Hide spinner
      },
      (error) => {
        console.error('Error loading products:', error);
        this.spinner.hide(); // Hide spinner on error
      }
    );
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

}
