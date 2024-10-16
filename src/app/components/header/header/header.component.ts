import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string | undefined;
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.userService.userName.subscribe(userName => {
      this.userName = userName;
    });
  }
  logout() {
    this.userService.setActiveUserName("");
    this.router.navigate(["login"]);
    }
}