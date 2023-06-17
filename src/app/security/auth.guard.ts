import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomerService } from '../serveice/customer.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  JwtHelperService: any;

  constructor(private rout: Router, private customerService: CustomerService) { }

  canActivate() {
    var jwtHelper = new JwtHelperService()
    if (localStorage.length != 0) {
      if (jwtHelper.isTokenExpired(localStorage.getItem("token"))) {
        this.customerService.logout()
        return false
      }
      else {
        return true
      }
    }
    else {
      this.rout.navigate(["auth"])
      return false
    }
  }

}
