import { Component, OnInit } from '@angular/core';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-profile',  
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  standalone: false
})
export class ProfileComponent implements OnInit {
  constructor(private backend:BackendService) { }

  ngOnInit(): void {
    // console.log('Profile component initialized');
    // 
    // this.backend.meUser().subscribe(
    //   data => console.log(data),
    // );
  }
}
