import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Cart } from '../Model/cart';
import { Product } from '../Model/product';
import { CartService } from '../serveice/cart.service';
import { ProductServiceService } from '../serveice/product-service.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  public products: Array<Product> = new Array()

  constructor(private productService: ProductServiceService, private rout: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.getAllProducut()
    localStorage.removeItem("carts")
  }

  public getAllProducut() {
    var category = this.rout.snapshot.paramMap.get('kind')
    if (category) {
      this.getByCategory(category)
    }
    else {
      this.productService.getAllProduct().subscribe(res => {
        JSON.parse(res.toString()).forEach((elem: Product) => {
          this.getImage(elem)
          this.products.push(elem)
        })
      })
    }
  }

  public getByCategory(category: string) {
    this.products = new Array()

    this.productService.getByCategory(category).subscribe(res => {
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

  getViewProduct(product: Product) {
    this.productService.getViewProduct(product)
  }

  addToCart(id: number, name: string, image: string, price: number, quantity: number) {
    var cart = new Cart(id, name, image, price, quantity)
    this.cartService.add(cart)
  }

}
