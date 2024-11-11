import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {
  patient = {
    //user_id: '', // Ensure to include user_id if needed
    name: '',
    age: null,
    gender: '',
    sampletype: '',
    clinicalhistory: '',
    diagnosis: '',
    senderName: '',
    sampleTransportDate: ''
  };

  token: string = ''; // Initialize token variable

  constructor(private http: HttpClient, private location: Location) {}

  ngOnInit(): void {
    // Fetch token from localStorage on component initialization
    this.token = localStorage.getItem('token') || '';
  }

  submitForm(form: NgForm) {
    //this.patient.sampleTransportDate = new Date().toISOString(); // Or use any date format you need
    this.patient.sampleTransportDate = new Date().toLocaleString();


    if (form.valid) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      });

      this.http.post('http://127.0.0.1:8000/api/patient', this.patient, { headers }).subscribe(
        response => {
          console.log('Response from server:', response);
          form.resetForm();
        },
        error => {
          console.error('Error occurred:', error);
          // Handle error as needed
        },
      () => {
        this.location.go(this.location.path()); // changes the current URL to the same one to trigger a reload
        window.location.reload();
      }  
      );
    }
  }
}
