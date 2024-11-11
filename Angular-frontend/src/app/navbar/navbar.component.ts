import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../_services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  public loggedIn:boolean = false;
  useremail: string | null = null;

  

constructor(
  private Auth:AuthService, private router: Router, private token: TokenService){}

ngOnInit(): void {
  this.Auth.authStatus.subscribe(
    value=>{
      this.loggedIn= value;
    }
  )
  this.useremail = localStorage.getItem('email'); // Adjust this based on your actual storage mechanism
  
  
  } 

logout(event:MouseEvent){
  event?.preventDefault();
  this.token.remove();
  localStorage.removeItem('email'); // Clear the email
  this.Auth.changeAuthStatus(false);
  this.router.navigateByUrl('/login')
}


}







// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { AuthService } from '../_services/auth.service';
// import { Subject } from 'rxjs';
// import { takeUntil } from 'rxjs/operators';

// @Component({
//   selector: 'app-navbar',
//   templateUrl: './navbar.component.html',
//   styleUrls: ['./navbar.component.css']
// })
// export class NavbarComponent implements OnInit, OnDestroy {
//   public loggedIn: boolean = false;
//   private unsubscribe$: Subject<void> = new Subject<void>();

//   constructor(private auth: AuthService, private router: Router, 
//   ) {}

//   ngOnInit(): void {
//     this.auth.authStatus
//       .pipe(takeUntil(this.unsubscribe$))
//       .subscribe(
//         value => {
//           this.loggedIn = value;
//         },
//         error => {
//           console.error('Error:', error);
//         }
//       );
//   }

//   logout(event: MouseEvent){
//     event.preventDefault();
//     this.auth.ChangeAuthStatus(false);
//     this.auth.router.navigateByUrl('/login');
//   }

//   // logout(): void {
//   //   this.auth.logout(); // Assuming logout method exists in AuthService
//   //   this.loggedIn = false;
//   // }

//   ngOnDestroy(): void {
//     this.unsubscribe$.next();
//     this.unsubscribe$.complete();
//   }
// }