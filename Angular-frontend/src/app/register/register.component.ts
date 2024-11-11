import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { RandomService } from '../_services/random.service';
import { TokenService } from '../_services/token.service';
import { Router } from '@angular/router';

interface FormData {
  name: string;
  email: string;
  rank: string;
  phone_number: string;
  password: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  formdata: FormData = { name: "", email: "", rank: "", phone_number: "", password: "" };
  submit = false;
  errorMessage = "";
  loading = false;
  error: any = null;

  constructor(private random: RandomService, private token: TokenService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loading = true; // Start loading
    this.errorMessage = ""; // Clear previous error messages
    console.log(this.formdata);
    this.random.register(this.formdata).subscribe(
      data => this.handleResponse(data),
      error => this.handleError(error)
    );
  }

  handleResponse(data: any) {
    console.log(data.access_token);
    this.token.handle(data.access_token);
    this.router.navigateByUrl('/login');
    this.loading = false; // Stop loading after successful registration
  }

  

  handleError(error: HttpErrorResponse) {
    this.error = error.error.error;
    this.errorMessage = "Registration failed. Please try again.";
    this.loading = false; // Stop loading on error
  }
}


