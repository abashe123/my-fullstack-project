import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.css']
})
export class ManageOrderComponent implements OnInit, OnDestroy {
  patients: any[] = [];
  filteredPatients: any[] = [];
  selectedPatient: any = null;
  senderName: string = '';
  searchTerm: string = '';
  token = localStorage.getItem('token');
  private subscriptions: Subscription[] = [];
  
  constructor(private http: HttpClient, private location: Location, private router: Router) {}
  
  ngOnInit(): void {
    this.loadPatients();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  selectPatient(patient: any): void {
    this.selectedPatient = patient;
  }

  toggleDetails(patient: any): void {
    this.selectedPatient = this.selectedPatient === patient ? null : patient;
  }

  createReport(patient: any) {
    console.log('Creating report for patient:', patient);
  }

  reportIssue(patient: any) {
    this.router.navigate(['/report'], { queryParams: { patientId: patient.id } });
  }

  openReportIssueModal() {
    // Implement modal opening logic if needed
  }

  loadPatients(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    const subscription = this.http.get('http://127.0.0.1:8000/api/submitted-patients', { headers })
      .subscribe(
        (response: any) => {
          console.log('patients', response.data);
          console.log('Full response:', response);
          console.log('Patients data:', response.data);
          this.patients = response.data;
          this.filteredPatients = this.patients; // Initialize filteredPatients
        },
        error => {
          console.error('Error occurred:', error);
        }
      );

    this.subscriptions.push(subscription);
  }

  markAsReceived(patient: any): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    this.http.post(`http://127.0.0.1:8000/api/patients/${patient.id}/mark-as-received`, {}, { headers })
      .subscribe(
        () => {
          this.loadPatients();
          this.updateReceivedSamples(patient);
          window.location.reload();
        },
        error => {
          console.error('Error marking patient as received:', error);
        }
      );
  }

  updateReceivedSamples(patient: any): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    this.http.post('http://127.0.0.1:8000/api/received-samples', { patient }, { headers })
      .subscribe(
        response => {
          console.log('Received samples updated:', response);
          window.location.reload();
        },
        error => {
          console.error('Error updating received samples:', error);
        }
      );
  }

  filterPatients(): void {
    this.filteredPatients = this.patients.filter(patient =>
      patient.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      patient.sampletype.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
