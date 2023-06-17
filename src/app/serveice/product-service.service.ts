import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from '../Model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  url_admin: string = "http://localhost:8080/api/product/"
  url_user: string = "http://localhost:8080/api/store/"
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

  constructor(private http: HttpClient, private router: Router) { }

  getProducts(): Observable<Array<Product>> {
    if (this.role == "[USER]") {
      return this.http.get<Array<Product>>(this.url_user + "getAllProducts/" + this.store_id, this.httpOptions)
    }
    else {
      return this.http.get<Array<Product>>(this.url_admin + "getAllProducts", this.httpOptions)
    }

  }

  getAllProduct(): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.url_admin + "getAllProducts", this.httpOptions)
  }

  getByCategory(category: string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(this.url_admin + "getByCategory/" + category, this.httpOptions)
  }

  addProduct(data: Product): Observable<Product> {
    if (this.role == "[USER]") {
      return this.http.post<Product>(this.url_admin + "addProductToStore/" + this.store_id, this.httpOptions)
    }
    else {
      return this.http.post<Product>(this.url_admin + "addProduct", data, this.httpOptions)
    }

  }

  uploads(data: FormData): Observable<any> {
    return this.http.post(this.url_admin + "uploadsImage", data, this.httpOptions)
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(this.url_admin + "getProduct/" + id, this.httpOptions)
  }

  download(id: number): Observable<Blob> {
    return this.http.get(this.url_admin + "getImage/" + id, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.token
      }),
      responseType: "blob"
    })
  }

  delete(id: number): Observable<any> {
    return this.http.delete(this.url_admin + "deleteProduct/" + id, this.httpOptions)
  }


  edit(product: Product): Observable<any> {
    return this.http.put(this.url_admin + "editProduct", product, this.httpOptions)
  }

  getViewProduct(product: Product) {
    this.router.navigate(['view'], { queryParams: product })
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }
}
