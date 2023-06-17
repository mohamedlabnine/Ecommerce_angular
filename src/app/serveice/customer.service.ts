import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from '../Model/customer';
import { Login } from '../Model/login';
import { ResponseLogin } from '../Model/response-login';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private url = "http://localhost:8080/api/auth/"

  constructor(private http: HttpClient, private rout: Router) { }

  public getNumberOfCustomers(): Observable<any> {
    return this.http.get(this.url + "NumberOfCustomers")
  }

  public login(login: Login): Observable<ResponseLogin> {
    return this.http.post<ResponseLogin>(this.url + "login", login)
  }

  public register(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.url + "register", customer)
  }

  public logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("id")
    localStorage.removeItem("role")
    localStorage.removeItem("id_store")
    localStorage.removeItem("carts")
    this.rout.navigate(["auth"])
  }

}
