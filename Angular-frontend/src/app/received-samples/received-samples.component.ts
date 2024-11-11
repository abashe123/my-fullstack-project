import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; // For user notifications

@Component({
  selector: 'app-received-samples',
  templateUrl: './received-samples.component.html',
  styleUrls: ['./received-samples.component.css']
})
export class ReceivedSamplesComponent implements OnInit {
  filteredSamples: any[] = [];
  searchTerm: string = '';
  receivedSamples: any[] = [];
  token = localStorage.getItem('token');
  loading = false; // For loading indicator

  constructor(private http: HttpClient, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getReceivedSamples();
  }

  getReceivedSamples(): void {
    this.loading = true; // Show loading indicator
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}` // Ensure the token is included
    });
  
    this.http.get<any[]>('http://127.0.0.1:8000/api/received-orders', { headers })
      .subscribe(
        data => {
          this.receivedSamples = data.map(sample => ({
            id: sample.id,
            name: sample.name,
            userName: sample.senderName || 'Unknown User',
            status: sample.status,
            receivedDate: sample.updated_at,
            fileUploaded: !!sample.pdf_file_path, // Track if file is uploaded
            pdf_file_path: sample.pdf_file_path // Track the file path
          }));
          this.filteredSamples = [...this.receivedSamples];
          this.loading = false; // Hide loading indicator
        },
        error => {
          console.error('Error fetching received samples', error);
          this.toastr.error('Failed to load received samples'); // Show error notification
          this.loading = false; // Hide loading indicator
        }
      );
  }

  onFileSelected(event: any, sampleId: number): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadFile(file, sampleId);
    }
  }

  uploadFile(file: File, patientId: number): void {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('patientId', patientId.toString());

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}` // Add your auth token if needed
    });

    this.http.post('http://127.0.0.1:8000/api/patients/upload-file', formData, { headers })
      .subscribe(
        (response: any) => {
          this.toastr.success('File uploaded successfully'); // Show success notification
          // Update the sample to reflect that a file has been uploaded
          const sample = this.filteredSamples.find(s => s.id === patientId);
          if (sample) {
            sample.fileUploaded = true;
            sample.pdf_file_path = response.filePath; // Update the file path
          }
        },
        error => {
          console.error('File upload failed', error);
          this.toastr.error('Failed to upload file'); // Show error notification
        }
      );
  }

  markAsCompleted(sampleId: number, filePath: string): void {
    if (!this.filteredSamples.find(sample => sample.id === sampleId)?.fileUploaded) {
      this.toastr.error('You must upload a file before marking as completed.'); // Show error notification
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    this.http.post(`http://127.0.0.1:8000/api/patients/complete/${sampleId}`, { filePath }, { headers })
      .subscribe(
        () => {
          this.toastr.success('Sample marked as completed'); // Show success notification
          this.getReceivedSamples(); // Reload samples to update status
        },
        error => {
          console.error('Error marking sample as completed:', error);
          this.toastr.error('Failed to mark sample as completed'); // Show error notification
        }
      );
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'completed':
        return 'status-completed';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  }

  onSearch(event: any): void {
    this.searchTerm = event.target.value.toLowerCase();
    this.filteredSamples = this.receivedSamples.filter(sample =>
      sample.name.toLowerCase().includes(this.searchTerm) ||
      sample.userName.toLowerCase().includes(this.searchTerm)
    );
  }
}
