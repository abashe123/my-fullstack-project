import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient, private toastr: ToastrService) {}
  
  userRole:any

  
  ngOnInit(): void {
    this.userRole = localStorage.getItem('role')
     this.showSuccess();
  }

  showSuccess() {
    this.toastr.success('Successfully!', 'Logged in!', {
      positionClass: 'toast-top-right'
    });
  }
  

  
  };

  