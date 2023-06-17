import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../Model/cart';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderRequest } from '../Model/order-request';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart: Array<Cart>
  public url = "http://localhost:8080/api/order/"
  private token = localStorage.getItem("token")

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'Bearer ' + this.token,
    }),
    responseType: 'text' as 'json'
  };

  constructor(private rout: Router, private http: HttpClient) {
    this.cart = JSON.parse(localStorage.getItem('carts') || '[]');
  }

  getCart() {
    return this.cart
  }

  remove(cart: Cart) {
    const index = this.cart.indexOf(cart);
    this.cart.splice(index, 1)
    this.synccarts()
  }

  add(cart: Cart) {
    this.cart.push(cart)
    this.synccarts()
    this.rout.navigate([""])
  }

  synccarts() {
    localStorage.setItem('carts', JSON.stringify(this.cart)) // sync the data
  }

  saveData(amount: number): Observable<any> {
    var product_id = new Array<number>
    var id_customer: number = localStorage.getItem("id") as unknown as number

    this.cart.forEach(item => product_id.push(item.product_id))

    var order = new OrderRequest(id_customer, amount, new Date(), [1, 2])

    return this.http.post(this.url + "saveOrder", order, this.httpOptions)
  }



}
