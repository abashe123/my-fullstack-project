import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  patientCount: number = 0; 
  token = localStorage.getItem('token');
  samplesReceived: any;


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadPatientCount();
    setInterval(() => this.loadPatientCount(), 60000); // Refresh every 60 seconds
  }
  

  loadPatientCount(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}` // Ensure the token is included
    });
    this.http.get<{ count: number }>('http://127.0.0.1:8000/api/patients/count', { headers })
      .subscribe(
        (data) => {
          this.patientCount = data.count;
        },
        (error) => {
          console.error('Error fetching patient count', error);
        }
      );
  }

  

  
}