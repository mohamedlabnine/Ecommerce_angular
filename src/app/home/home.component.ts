import { Component, OnInit } from '@angular/core';
import { Cart } from '../Model/cart';
import { Product } from '../Model/product';
import { CartService } from '../serveice/cart.service';
import { ProductServiceService } from '../serveice/product-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public products: Array<Product> = new Array()
  constructor(private productService: ProductServiceService, private cartservice: CartService) { }

  ngOnInit(): void {
    this.getAllProducut()
  }

  public getAllProducut() {
    this.productService.getAllProduct().subscribe(res => {
      JSON.parse(res.toString()).forEach((elem: Product) => {
        this.getImage(elem)
        this.products.push(elem)
      })
    })
  }

  public getImage(product: Product) {
    var path: any = ""
    var reader = new FileReader();
    this.productService.download(product.id).subscribe(
      blob => {
        // transformed blob to a image 
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          path = reader.result;
          product.image = path
        }
      }
    )

  }

  addToCart(id: number, name: string, image: string, price: number, quantity: number) {
    var cart = new Cart(id, name, image, price, quantity)
    this.cartservice.add(cart)
  }


}
