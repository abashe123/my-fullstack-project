import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated() {
  }
  private loggedIn = new BehaviorSubject<boolean>(this.token.loggedIn());
  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value:boolean){
    this.loggedIn.next(value);
  }



  constructor(private token :TokenService, private router: Router ) { }

  

  }
 
