import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from 'src/app/models/user-interface';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  userName: string = "";
  emailId: string = "";
  password: string = "";
  user!: UserInterface;
  errorMessage: string = "";
  errorMessageDownload: string = "";
  registerButtonValue: string = "Register";

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
  }
  register(): void {

    if (!this.userName) {
      alert("Please fill the username.");
    } else if (this.userName.length < 4) {
      alert("Username must contain minimum 4 characters.");
    } else if (!this.emailId) {
      alert("Please fill the email id.");
    } else if ((this.emailId.length < 17) || ("@capgemini.com" !== this.emailId.substring(this.emailId.length - 14, this.emailId.length))) {
      alert("The email id must be Capgemini email id only.");
    } else if (!this.password) {
      alert("Please fill the password.");
    } else if (this.password.length < 8) {
      alert("Password must contain minimum 8 characters.");
    }
    else {
      this.user = {
        userName: this.userName,
        emailId: this.emailId,
        password: this.password,
        resetPasswordKey: "",
      }
      try {
        this.registerButtonValue = "Processing...";
        this.userService.userRegistration(this.user).subscribe(response => {
          this.registerButtonValue = "Register";
          if (response) {
            this.router.navigate(["login"]);
          }
        });
      } catch (err) {
        this.registerButtonValue = "Register";
        this.errorMessage = 'Failed to register the user. Please retry.';
      }
    }
  }
}
