import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RandomService } from '../_services/random.service';
import { TokenService } from '../_services/token.service';
import { AuthService } from '../_services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formdata={email:"", password:""};
  submit=true;
  loading=false;
  errorMessage="";
  handlerError: any;


  constructor(private RandomService: RandomService, private token: TokenService, private router: Router, private Auth: AuthService,
    private toastr: ToastrService
  ){}

  ngOnIt(): void{
    
}
  public error = null;
  onSubmit() {
    this.loading = true;
    return this.RandomService.login(this.formdata).subscribe(
      data => {
        this.handleResponse(data);
        this.loading = false;  // Stop spinner on success
        // this.loginSuccess = true;
        // setTimeout(() => this.loginSuccess = false, 3000); // Hide message after 3 seconds
      },

      error => {
        this.handlerError (error);
        this.loading = false;  // Stop spinner on error
      },
    );
  }

  handleResponse(data:any){
    console.log(data);
    this.token.handle(data.token);
    const userData =localStorage.setItem("currentUser", JSON.stringify(data.user['role']));
    //const username =localStorage.setItem("name", JSON.stringify(data.user['name']));
    //const useremail =localStorage.setItem("email", JSON.stringify(data.user['email']));
    const username = data.user['name']; localStorage.setItem('name', username);
    const userEmail = data.user['email']; localStorage.setItem('email', userEmail);
    const userLoggedIn :any = localStorage.getItem("currentUser")
    const currentUser = JSON.parse(userLoggedIn)
    if(userLoggedIn){
      const currentUser = JSON.parse(userLoggedIn);
      console.log(currentUser)
      
      }else{
      
      console.log('No current user');
      }

    console.log('current user:', currentUser);
    console.log(userData);
    this.Auth.changeAuthStatus(true);
    //const role = this.token.getRole();
    if (currentUser.role === "admin") {
      this.router.navigateByUrl('/admin');
    } else {
      this.router.navigateByUrl('/dashboard');
    }
  }


  handleError(error: HttpErrorResponse) {
    console.error('Handling Error:', error); // Log the error
    const message = error.error.message || 'Invalid credentials. Please try again.';
    this.toastr.error(message, 'Login Failed'); // Display error message
  }
  


  
}
  
  
