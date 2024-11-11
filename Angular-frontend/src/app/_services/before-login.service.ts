import { Injectable } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class BeforeLoginService implements CanActivate {
  canActivate (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean>{
    return !this.token.loggedIn();

  }

  constructor(private token: TokenService) { }
}
