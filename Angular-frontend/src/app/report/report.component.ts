import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  reportData = {
    handledBy: '',
    receivedBy: '',
    issueReason: '',
    elaborateOther: '',
    actionTaken: '',
    reportedTo: '',
    reportDate: '',
    patientDetails: { id: null }  // Initialize with patient ID
  };

  token = localStorage.getItem('token');
  
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Retrieve patient details if necessary
    // This might include fetching the patient ID
  }

  submitReport(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    // Combine patient details with report data
    const reportPayload = {
      ...this.reportData,
      patientDetails: this.reportData.patientDetails
    };

    this.http.post('http://localhost:8000/api/report-issue', reportPayload, { headers })
      .subscribe(
        (response: any) => {
          console.log('Report submitted successfully:', response);
          // Handle the response
          alert(`Report submitted successfully. Here are the details:\n
            Handled By: ${response.reportData.handledBy}\n
            Received By: ${response.reportData.receivedBy}\n
            Issue Reason: ${response.reportData.issueReason}\n
            Elaborate Other: ${response.reportData.elaborateOther}\n
            Action Taken: ${response.reportData.actionTaken}\n
            Reported To: ${response.reportData.reportedTo}\n
            Report Date: ${response.reportData.reportDate}\n`
          );
          // Optionally handle successful submission, e.g., close the modal
          //$('#reportIssueModal').modal('hide');  // Close the modal using jQuery
        },
        error => {
          console.error('Error submitting report:', error);
          // Handle error
        }
      );
  }
}
