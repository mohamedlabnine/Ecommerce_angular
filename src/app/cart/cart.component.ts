import { Component, OnInit } from '@angular/core';
import { Cart } from '../Model/cart';
import { CartService } from '../serveice/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public carts: Array<Cart> = new Array()
  public numberProducts = 0
  public amount = 0
  constructor(private cartService: CartService, private rout: Router) { }

  ngOnInit(): void {
    this.carts = this.cartService.getCart()
    this.numberProducts = this.carts.length
    this.carts.forEach(elm => this.amount += elm.price * elm.quantiy)
  }

  remove(cart: Cart) {
    this.cartService.remove(cart)
  }

  saveData() {
    this.cartService.saveData(this.amount).subscribe(
      res => this.rout.navigate(['payment'])
        .then(() => {
          window.location.reload();
        })
    )
  }

}
