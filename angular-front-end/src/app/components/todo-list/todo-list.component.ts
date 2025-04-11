
declare var bootstrap: any;

import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-todo-list',  
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  standalone: false
})
export class TodoListComponent implements OnInit {
  
  constructor(private backendService:BackendService) { }
  
  ngOnInit() {
    this.backendService.getTasks().subscribe((res: any) => {
      this.tasks = res.tasks;
      this.completed = res.completed;
      this.total = res.total;
      this.filterTasks();
    });
  }  
  
  newTask = {
    description: '',
    status: 'PENDING'
  };
  
  searchTerm = '';
  selectedFilter = 'all';
  tasks: any[] = []; 
  filteredTasks = this.tasks;
  
  completed = 0;
  total = 0;
  
  selectedTask: any = {};
  
  openEditModal(task: any) {
    this.selectedTask = { ...task };
    const modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
  }

  saveChanges() {
    if (!this.selectedTask?.id) {
      console.error('ID inválido para atualização');
      return;
    }
  
    this.backendService.updateTask(this.selectedTask.id, {
      description: this.selectedTask.description,
      status: this.selectedTask.status
    }).subscribe(() => {
      const index = this.tasks.findIndex(t => t.id === this.selectedTask.id);
      if (index !== -1) {
        this.tasks[index].description = this.selectedTask.description;
        this.tasks[index].status = this.selectedTask.status;
      }
  
      this.updateTaskCounts();     // atualiza contadores
      this.filterTasks();          // refiltra lista se filtro ou busca estiverem ativos
      this.selectedTask = {};      // limpa seleção
  
      const modalEl = document.getElementById('editModal');
      const modal = bootstrap.Modal.getInstance(modalEl);
      modal.hide();                // fecha o modal
    });
  }
  
  openDeleteModal(task: any) {
    this.selectedTask = task;
    const modal = new bootstrap.Modal(document.getElementById('deleteModal')!);
    modal.show();
  }

  confirmDelete() {
    this.backendService.deleteTask(this.selectedTask.id).subscribe(() => {
      // Remove da lista local
      this.tasks = this.tasks.filter(t => t.id !== this.selectedTask.id);
  
      // Atualiza contadores
      this.updateTaskCounts();
      
      this.filterTasks();
      this.selectedTask = {};
  
      const modalEl = document.getElementById('deleteModal')!;
      const modal = bootstrap.Modal.getInstance(modalEl)!;
      modal.hide();
    });
  }  
  
  openNewTaskModal() {
    this.newTask = {
      description: '',
      status: 'PENDING'
    };
    const modal = new bootstrap.Modal(document.getElementById('newTaskModal')!);
    modal.show();
  }
  
  addTask() {
    this.backendService.createTask(this.newTask).subscribe((res: any) => {
      const novaTarefa = res.task;
  
      this.tasks.push(novaTarefa);
      this.updateTaskCounts();
      this.filterTasks();
      
      this.newTask = { description: '', status: 'PENDING' };
      
      const modalEl = document.getElementById('newTaskModal')!;
      const modal = bootstrap.Modal.getInstance(modalEl)!;
      modal.hide(); // fecha o modal
    });
  }   
  
  updateTaskCounts() {
    this.completed = this.tasks.filter(t => t.status === 'COMPLETED').length;
    this.total = this.tasks.length;
  }

  filterTasks() {
    const search = this.searchTerm.toLowerCase();
    
    this.filteredTasks = this.tasks.filter(task => {      
      const matchDescription = (task.description || '').toLowerCase().includes(search);
      
      const matchStatus = this.selectedFilter === 'all' || 
        (this.selectedFilter === 'pending' && task.status === 'PENDING') ||
        (this.selectedFilter === 'in-progress' && task.status === 'IN_PROGRESS') ||
        (this.selectedFilter === 'completed' && task.status === 'COMPLETED');
  
      return matchDescription && matchStatus;
    });
  }
}
