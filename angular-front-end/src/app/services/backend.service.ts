import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {    
  
  constructor(private http: HttpClient) {}

  // Autenticação
  login(data: any) {    
    return this.http.post(`${environment.URL_BACKEND}/login`, data);
  }

  signup(data: any) {
    return this.http.post(`${environment.URL_BACKEND}/signup`, data);
  }

  logout() {
    return this.http.post(`${environment.URL_BACKEND}/logout`, {});
  }

  refreshToken() {
    return this.http.post<any>(`${environment.URL_BACKEND}/refresh`, {});
  }

  meUser() {
    return this.http.get<any>(`${environment.URL_BACKEND}/me`);
  }

  // TAREFAS - CRUD
  getTasks() {
    return this.http.get<any>(`${environment.URL_BACKEND}/tasks`);
  }

  createTask(data: any) {
    return this.http.post(`${environment.URL_BACKEND}/tasks`, data);
  }

  updateTask(id: number, data: any) {
    return this.http.put(`${environment.URL_BACKEND}/tasks/${id}`, data);
  }

  deleteTask(id: number) {
    return this.http.delete(`${environment.URL_BACKEND}/tasks/${id}`);
  }
}
