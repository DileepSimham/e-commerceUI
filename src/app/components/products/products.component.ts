import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AppUser } from '../model/app-user.mode';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {

  users: AppUser[] = []; // Array to hold the list of users

  constructor(private userService: AuthService) {}

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(
      (data: AppUser[]) => {
        this.users = data;  // Assign the fetched data to the users array
      },
      (error) => {
        console.error('Error fetching users:', error);  // Handle error if any
      }
    );
  }

}
