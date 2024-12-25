import { Component } from '@angular/core';
import { User } from '../model/user.model';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  user = new User();

  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  constructor(private readonly keycloak: KeycloakService) { }

  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();

    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      this.user.authStatus = 'AUTH';
      this.user.name = this.userProfile.firstName + " " + this.userProfile.lastName || "";
      this.user.roles = await this.keycloak.getUserRoles(true)
      window.sessionStorage.setItem("userdetails", JSON.stringify(this.user));

      // Retrieve the user details from sessionStorage
      const userDetails = JSON.parse(window.sessionStorage.getItem("userdetails"));

      // Extract the email
      const email = userDetails ? userDetails.email : null;

      console.log(this.user.name)
    }
  }


  public login() {
    this.keycloak.login();
  }

  public logout() {
    let redirectURI: string = "http://localhost:4200/home";
    this.keycloak.logout(redirectURI);
  }

  // Helper function to check if the user has the ADMIN role
  public isAdmin(): boolean {
    return this.user.roles && this.user.roles.includes('ADMIN');
  }

}
