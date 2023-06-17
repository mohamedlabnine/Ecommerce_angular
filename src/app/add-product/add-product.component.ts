import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../Model/product';
import { ProductServiceService } from '../serveice/product-service.service';
import { StoreService } from '../serveice/store.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})

export class AddProductComponent {

  public form = new FormGroup({
    name: new FormControl("", [Validators.required]),
    image: new FormControl("", [Validators.required]),
    price: new FormControl("", [Validators.required]),
    quantity: new FormControl("", [Validators.required]),
    category: new FormControl("", [Validators.required]),
    offer: new FormControl("", [Validators.required]),
    description: new FormControl("", [Validators.required]),
  })
  public isSelected = false
  public file!: File
  public row!: Product
  public preview!: string

  public error = this.form.controls.name.valid && this.form.controls.description.valid
    && this.form.controls.category.valid && this.form.controls.price.valid
    && this.form.controls.quantity.valid && this.form.controls.offer.valid
    && this.form.controls.image.valid


  constructor(private productService: ProductServiceService,
    private rout: Router,
    private storeService: StoreService) { }

  addProduct() {
    var name: string = this.form.value.name!
    var des: string = this.form.value.description!
    var category: string = this.form.value.category!
    var offer: number = +this.form.value.offer!
    var quantity: number = +this.form.value.quantity!
    var price: number = +this.form.value.price!

    if (this.file != null) {

      var product = new Product(name, des, category, offer, quantity, price, this.file.name)

      this.productService.addProduct(product).subscribe(
        res => {
          this.uploadfile(this.file)
        }
      )

    }

  }

  uploadfile(file: File) {
    var data = new FormData()
    data.append("file", file)
    this.productService.uploads(data).subscribe(
      res => console.log(res)
    )
  }

  onFileChange(event: any) {
    this.isSelected = true
    this.file = event.target.files[0]
    const reader = new FileReader();
    reader.onload = (e: any) => {
      console.log(e.target.result);
      this.preview = e.target.result;
    };

    reader.readAsDataURL(this.file);
  }

}
