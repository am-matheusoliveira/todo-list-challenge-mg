import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  private apiUrl = 'http://localhost:8000/api';

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  // Autenticação
  login(data: any) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  signup(data: any) {
    return this.http.post(`${this.apiUrl}/signup`, data);
  }

  logout() {
    return this.http.post(`${this.apiUrl}/logout`, {});
  }

  refreshToken() {
    return this.http.post<any>(`${this.apiUrl}/refresh`, {});
  }

  meUser() {
    return this.http.get<any>(`${this.apiUrl}/me`);
  }

  // TAREFAS - CRUD
  getTasks() {
    return this.http.get<any>(`${this.apiUrl}/tasks`);
  }

  createTask(data: any) {
    return this.http.post(`${this.apiUrl}/tasks`, data);
  }

  updateTask(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/tasks/${id}`, data);
  }

  deleteTask(id: number) {
    return this.http.delete(`${this.apiUrl}/tasks/${id}`);
  }
}
