import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handle(data: any): void {
    this.set(data);    
  }

  set(data: any): void {    
    return localStorage.setItem('token', JSON.stringify(data));
  }
  
  get(){    
    const data = JSON.parse(localStorage.getItem('token') || '{}');
    
    return data.access_token;
  }
  
  remove() {
    return localStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if(payload){
        const issuers = [
          "http://localhost:8000/api/login",
          "http://localhost:8000/api/signup",
          "http://localhost:8000/api/refresh",
          "http://127.0.0.1:8000/api/login",
          "http://127.0.0.1:8000/api/signup",
          "http://127.0.0.1:8000/api/refresh"
        ];
        
        return issuers.includes(payload.iss);
      }
    }
    return false;
  }
  
  payload(token: any) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload: any) { 
    return JSON.parse(atob(payload));
  }
  
  loggedIn() {
    return this.isValid();
  }
  
  isTokenExpired(): boolean {
    const data = JSON.parse(localStorage.getItem('token') || '{}');
    
    const createdAt = Number(data.created_at);
    const expiresIn = Number(data.expires_in);
    const now = Math.floor(Date.now() / 1000);
  
    if (!createdAt || !expiresIn) return true;
    
    return now > (createdAt + expiresIn);
  }  
}
