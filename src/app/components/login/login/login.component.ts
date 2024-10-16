import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  username: string | undefined;
  password: string | undefined;

  ngOnInit(): void {
  }

  login(): void {
    if (this.username == 'admin' && this.password == 'admin') {
      this.userService.setActiveUserName(this.username);
      this.router.navigate(["create-template"]);
    } else {
      alert("Invalid credentials");
    }
  }
}
