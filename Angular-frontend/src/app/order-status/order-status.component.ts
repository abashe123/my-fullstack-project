import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.css']
})
export class OrderStatusComponent implements OnInit {
  orderSamples: any[] = [];
  token = localStorage.getItem('token');

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getOrderStatus();
  }

  getOrderStatus(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}` // Ensure the token is included
    });
    this.http.get<any[]>('http://127.0.0.1:8000/api/order-status', { headers }).subscribe(
      data => {
        this.orderSamples = data.map(sample => ({
          name: sample.name,
          estimatedTAT: sample.estimatedTAT || '3-5 Days', // Default value if empty
          date: sample.updated_at, // Adjust if needed
          status: sample.status, // Status should be "Processing" or "Completed"
          pdf_file_path: sample.pdf_file_path // Only add if status is completed
        }));
      },
      error => {
        console.error('Error fetching order status', error);
      }
    );
  }

  getFileUrl(filePath: string): string {
    // Remove 'public/' from the file path
    const trimmedFilePath = filePath.replace('public/', '');
    return `http://127.0.0.1:8000/storage/${trimmedFilePath}`;
  }
  

  // getFileUrl(filePath: string): string {
  //   // Construct the URL for the downloaded file
  //   return `http://127.0.0.1:8000/storage/pdfs/${filePath}`;
  // }
  
}


