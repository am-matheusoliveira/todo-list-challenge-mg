import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private loggedIn: BehaviorSubject<boolean>;
  authStatus;

  changeAuthStatus(value: boolean) {
    this.loggedIn.next(value);
  }

  constructor(private token: TokenService) {
    this.loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
    this.authStatus = this.loggedIn.asObservable();
  }  
}
