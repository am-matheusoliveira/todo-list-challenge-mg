import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token.service';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-navbar',  
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: false
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean = false; 
  
  constructor(private authService:AuthService, private router:Router, private tokenService:TokenService, private backendService:BackendService) { }

  ngOnInit(): void {
    this.authService.authStatus.subscribe(
      value => {
        this.loggedIn = value
      }
    );
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.backendService.logout().subscribe(
      // data => console.log(data)
    );
    this.tokenService.remove();
    this.authService.changeAuthStatus(false);
    this.router.navigateByUrl('/login');
  }
  
  getHomeLink(): string {
    return this.loggedIn ? 'home' : '/';
  }
}
