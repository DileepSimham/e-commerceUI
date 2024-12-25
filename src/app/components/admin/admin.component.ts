import { Component, OnInit } from '@angular/core';
import { KeycloakUserService } from '../../services/keycloakuser.service';
import { KeycloakUser } from '../model/keycloakuser.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: KeycloakUser[] = [];
  filteredUsers: KeycloakUser[] = [];
  searchText = {
    username: '',
    firstName: '',
    lastName: '',
    email: ''
  };

  constructor(private keycloakUserService: KeycloakUserService) {}

  ngOnInit(): void {
    this.loadUsers();
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
}
