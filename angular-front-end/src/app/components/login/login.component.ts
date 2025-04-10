import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

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
  
  constructor(private backend:BackendService) { }
  
  ngOnInit(): void {    
  }
  
  public error = null;
  
  submitLogin() {    
    return this.backend.login(this.form).subscribe(
      data => console.log(data), error => this.handleError(error)
    );
  }
  
  handleError(error: any) {    
    this.error = error.error.error;
  }
}
