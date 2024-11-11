import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  
  
  constructor() { }

  handle(token:any){
    this.set(token);
  }
  
  set(token:any){
    //const tkn = localStorage.setItem('token',token)
    //console.log(tkn)
    return localStorage.setItem('token', token);
  }
  
  get(){
    return localStorage.getItem('token');
  }

  remove(){
    return localStorage.removeItem('token');
  }

  isValid(){
    const token = this.get();
    if(token){
      const payload = this.payload(token);
      //console.log(payload)
      if(payload){
        return(payload.iss==="http://127.0.0.1:8000/api/login")?true:false;
      }
    }
    return false;
  }

  payload (token:any){
    const payload = token.split('.')[1];
    //console.log(payload)
    return this.decode(payload)
  }

  decode(payload:any){
    //console.log(payload)
    return JSON.parse(atob(payload));
  }

  getRole() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      return payload ? payload.role : null; // Ensure your token payload includes the 'role'
    }
    return null;
  }

  loggedIn(){
    return this.isValid(); 
  }

  
}



