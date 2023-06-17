import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../serveice/cart.service';
import { CustomerService } from '../serveice/customer.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public login = localStorage.length != 1 ? true : false
  public number_product = 0

  isAdmin: boolean = localStorage.getItem('role') == "[ADMIN]"

  constructor(private dailog: MatDialog, private rout: Router, private customerService: CustomerService, private cartService: CartService) { }

  ngOnInit(): void {
    this.number_product = this.cartService.cart.length
    console.log(localStorage.length)
  }

  getCart() {
    if (this.login) {
      this.dailog.open(CartComponent
      )
    }
    else {
      this.rout.navigate(["auth"])
    }
  }

  logout() {
    this.customerService.logout()
    console.log("logout")
  }

  store() {
    if (this.login) {
      if (localStorage.getItem('role') == "[ADMIN]") {
        this.rout.navigate(["../dashboard"])
      } else if (localStorage.getItem('role') == "[Customer]") {
        this.rout.navigate(["../products"])
      } else {
        this.rout.navigate(["../store"])
      }
    }
    else {

    }
  }

}
