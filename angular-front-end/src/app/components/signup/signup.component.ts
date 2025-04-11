import { Component, OnInit  } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { TokenService } from '../../services/token.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',  
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  standalone: false
})
export class SignupComponent implements OnInit {
  public form={
    name: null,
    email: null,
    password: null,
    password_confirmation: null
  }

  constructor(private backend:BackendService, private token:TokenService, private router:Router, private authService:AuthService) { }

  public error:any = [];
  
  ngOnInit(): void {    
  }
  
  submitSignup() {    
    return this.backend.signup(this.form).subscribe(
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
    this.error = error.error.errors;
  }
}