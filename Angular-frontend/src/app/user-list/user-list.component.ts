import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users: any[] = [];
  errorMessage: string = '';
  token = localStorage.getItem('token');



  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  
    this.http.get<any>(`http://127.0.0.1:8000/api/non-admin-users`, { headers })
      .subscribe(
        response => {
          console.log('Response:', response); // Log response to check its format
          this.users = response.data || []; // Access the 'users' property if present
        },
        error => this.errorMessage = 'Error fetching user data'
      );
  }
  
}

