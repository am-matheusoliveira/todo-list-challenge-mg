import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: false
})
export class LoginComponent implements OnInit {
  public form={
    email: null,
    password: null
  }
  
  constructor(private backend:BackendService, private token:TokenService, private router:Router, private authService:AuthService) { }
  
  public error = null;
  
  ngOnInit(): void {
  }
  
  submitLogin() {
    return this.backend.login(this.form).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }
  
  handleResponse(data: any) {    
    this.token.handle(data);    
    this.authService.changeAuthStatus(true);
    this.router.navigateByUrl('/home');
  }
  
  handleError(error: any) {    
    this.error = error.error.error;
  }
}
