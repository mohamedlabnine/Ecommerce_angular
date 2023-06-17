import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public url = "http://localhost:8080/api/order/"
  public url_Store = "http://localhost:8080/api/store/"
  private token = localStorage.getItem("token")
  private role = localStorage.getItem("role")
  private user_id = +localStorage.getItem("id")!
  private store_id = +localStorage.getItem("id_store")!

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
    }),
    responseType: 'text' as 'json'
  };

  constructor(private http: HttpClient) { }

  public getAllOrders(): Observable<any> {
    return this.http.get(this.url + "getAllOrders", this.httpOptions)


    // if (this.role = '[USER]') {
    //   return this.http.get(this.url_Store + "getAllOrders/" + this.store_id, this.httpOptions)
    //}
    // else {
    //   return this.http.get(this.url + "getAllOrders", this.httpOptions)
    // }
  }

  public getOrder(id: number): Observable<any> {
    return this.http.get(this.url + "getOrder/" + id, this.httpOptions)
  }
}
