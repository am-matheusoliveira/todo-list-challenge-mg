import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  
  constructor(private http:HttpClient, private tokenService:TokenService) { }
  
  login(data: any) {	
    return this.http.post('http://localhost:8000/api/login', data);
  }

  signup(data: any) {	
    return this.http.post('http://localhost:8000/api/signup', data);
  }
  
  logout() {	
    return this.http.post('http://localhost:8000/api/logout', {});
  }
  
  refreshToken() {
    return this.http.post<any>('http://localhost:8000/api/refresh', {});
  }

  meUser() {
    return this.http.get<any>('http://localhost:8000/api/me', {});
  }  
}
