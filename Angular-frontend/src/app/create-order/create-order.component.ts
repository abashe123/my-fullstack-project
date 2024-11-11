import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})
export class CreateOrderComponent implements OnInit {


  senderName: string = '';
  sampleTransportDate: string = '';
  successMessageVisible: any;
  hospitalName: any;
  submitted: boolean = false; // New flag
  getPatients: any;
  


  constructor(private http: HttpClient, private location: Location) {}
  patients:any[]=[];
  token = localStorage.getItem('token');


  ngOnInit(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    this.hospitalName = localStorage.getItem("name")
    this.http.get('http://127.0.0.1:8000/api/patient',{headers}).subscribe(
      (response:any) =>  {
        console.log('patients', response.data)
        return this.patients = response.data
      },
      error => console.error('Error occurred:', error)
    );
  }

  deletePatient(patient: any): void {
    if (patient.submitted) {
      console.log('Patient has been submitted. Deletion is not allowed.');
      return; // Prevent deletion if patient is already submitted
    }
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    this.http.delete(`http://127.0.0.1:8000/api/patients/${patient}`, { headers }).subscribe(
      (response: any) => {
        console.log('Patient deleted:', response);
        // Remove patient from the array
        this.patients = this.patients.filter(p => p !== patient);
        window.location.reload();

      },
      error => console.error('Error deleting patient:', error)
    ),
    () => {
     
    }  
  }

  editPatient(patient: any): void {
    if (patient.submitted) {
      console.log('Patient has been submitted. Editing is not allowed.');
      return; // Prevent editing if patient is already submitted
    }

    // Implement your logic to edit the patient record
    // Example: Open a modal or navigate to an edit form
    console.log('Edit patient:', patient);
  }
  


  // Method to submit a patient
  sendPatientData(patientId: number): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  
    this.http.post(`http://127.0.0.1:8000/api/patients/submit/${patientId}`, {}, { headers })
      .subscribe(
        response => {
          console.log('Patient submitted successfully:', response);
          this.successMessageVisible = true;
          setTimeout(() => this.successMessageVisible = false, 3000);
  
          // Find the patient and update the submitted property
          const patient = this.patients.find(p => p.id === patientId);
          if (patient) {
            patient.submitted = true;
          }
        },
        error => console.error('Error submitting patient:', error)
      );
  }
  

  };

