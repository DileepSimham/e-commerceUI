import { Component, OnInit } from '@angular/core';
import { KeycloakUserService } from '../../services/keycloakuser.service';
import { KeycloakUser } from '../model/keycloakuser.model';
import { Product } from '../model/product.model';
import { CartService } from '../../services/cart.service';
import { Cart } from '../model/cart.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  cart: Cart = {
    id: 0,              // Default id (you can change this later)
    user: {},           // Default empty object, will be populated once fetched
    products: [],       // Empty array for products
    orderstatus: ''     // Default empty string for order status
  };  // Cart for the logged-in user

  total: number = 0;

  carts: Cart[] = []; // Store all carts for users

  users: KeycloakUser[] = [];
  filteredUsers: KeycloakUser[] = [];
  searchText = {
    username: '',
    firstName: '',
    lastName: '',
    email: ''
  };

  constructor(private keycloakUserService: KeycloakUserService, private cartService: CartService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.loadCarts();
  }

  loadCarts(): void {
    console.log("hello")
    this.cartService.getAllCarts().subscribe(
      (carts: Cart[]) => {
        this.carts = carts;  // Store the list of carts
        console.log(carts)
        
      },
      (error) => {
        console.error('Error loading carts:', error);
      }
    );
  }

  calculateTotal(): void {
    this.total = this.cart.products.reduce((sum, product) => sum + (product.price || 0), 0);
  }

  loadUsers(): void {
    this.keycloakUserService.getUsers().subscribe(
      (users) => {
        this.users = users;
        this.filteredUsers = users; // Initialize with all users
      },
      (error) => {
        console.error('Error loading users:', error);
      }
    );
  }

  filterUsers(): void {
    this.filteredUsers = this.users.filter((user) => {
      return (
        (user.username.toLowerCase().includes(this.searchText.username.toLowerCase()) || !this.searchText.username) &&
        (user.firstName.toLowerCase().includes(this.searchText.firstName.toLowerCase()) || !this.searchText.firstName) &&
        (user.lastName.toLowerCase().includes(this.searchText.lastName.toLowerCase()) || !this.searchText.lastName) &&
        (user.email.toLowerCase().includes(this.searchText.email.toLowerCase()) || !this.searchText.email)
      );
    });

    // If no match found, show an empty table or a message
    if (this.filteredUsers.length === 0) {
      console.log("No users found!");
    }
  }

  updateStatus(email: String, newStatus: string): void {
    this.cartService.changeProductStatus(email,newStatus).subscribe(
      (updatedCart) => {
        // Update the cart in the list
        this.carts = this.carts.map(cart => cart.user.email === email ? updatedCart : cart);
        alert('Order status updated successfully!');
      },
      (error) => {
        console.error('Error updating order status:', error);
        alert('Error updating order status!');
      }
    );
  }

}
