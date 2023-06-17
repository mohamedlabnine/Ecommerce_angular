import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cart } from '../Model/cart';
import { Product } from '../Model/product';
import { CartService } from '../serveice/cart.service';
import { ProductServiceService } from '../serveice/product-service.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {

  public products: Array<Product> = new Array()
  public product!: Product
  constructor(private productService: ProductServiceService, private rout: ActivatedRoute, private cartservice: CartService) { }

  ngOnInit(): void {
    this.rout.queryParams.subscribe(
      param => {
        this.product = new Product(param['name'], param['description'], param['category'], param['offer'], param['quantity'], param['price'], param['image'])
        console.log(this.product)
      }
    )
    this.getAllProducut()
  }

  public getAllProducut() {
    this.productService.getByCategory(this.product.category).subscribe(res => {
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


  addTocart() {
    var cart = new Cart(this.product.id, this.product.name, this.product.image, this.product.price, this.product.quantity)
    this.cartservice.add(cart)
  }


}
