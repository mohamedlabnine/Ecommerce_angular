import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateStore } from '../Model/create-store';
import { Product } from '../Model/product';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private url = "http://localhost:8080/api/store/"
  private token = localStorage.getItem("token")

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
    }),
    responseType: 'text' as 'json'
  };

  constructor(private http: HttpClient) { }

  public sendEmailVerification(email: string): Observable<any> {
    return this.http.get(this.url + "SendEmailVerification/" + email, this.httpOptions)
  }

  public createStore(createStore: CreateStore): Observable<any> {
    return this.http.post(this.url + "createStore", createStore, this.httpOptions)
  }

  public addProductToStore(product: Product): Observable<any> {
    return this.http.post(this.url + "addProductToStore/1", product, this.httpOptions)
  }

  public getNumberOfStores(): Observable<any> {
    return this.http.get(this.url + "getNumberOffStore", this.httpOptions)
  }
}
