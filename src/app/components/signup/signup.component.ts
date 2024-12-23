import { Component } from '@angular/core';
import { AuthService, SignupData } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  user: SignupData = { username: '', password: '', confirmPassword: '' };
  submitted = false;
  responseMessage: string | null = null;  // To store success or error message

  constructor(private authService: AuthService) { }

  onSubmit() {
    this.submitted = true;

    // Call the signup service method
    this.authService.signup(this.user).subscribe(
      (response) => {
        this.responseMessage = 'Signup successful!';  // Handle success
        console.log(response);  // You can handle the response here
      },
      (error) => {
        this.responseMessage = 'Error during signup! Please try again.';  // Handle error
        console.error(error);
      }
    );
  }

}
