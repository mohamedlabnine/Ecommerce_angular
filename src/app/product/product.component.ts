import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../Model/product';
import { ProductServiceService } from '../serveice/product-service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})

export class ProductComponent implements OnInit {

  public row: Product = new Product("", "", "", 0, 0, 0, "")
  form = new FormGroup({
    name: new FormControl(this.row.name, [Validators.required]),
    image: new FormControl("", [Validators.required]),
    price: new FormControl(this.row.price, [Validators.required]),
    quantity: new FormControl(this.row.quantity, [Validators.required]),
    category: new FormControl(this.row.category, [Validators.required]),
    offer: new FormControl(this.row.offer, [Validators.required]),
    description: new FormControl(this.row.description, [Validators.required]),
  })

  public isSelectedRow = false
  public preview: any = "https://cdn-icons-png.flaticon.com/512/57/57165.png"
  public selectedFiles!: FileList
  public currentFile!: File
  public products = new Array<Product>()
  public displayedColumns: string[] = ['id', 'name', 'offer', 'quantity', 'price'];
  public dataSource!: MatTableDataSource<Product>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.getAllProduct()
  }

  public getAllProduct() {
    this.products = new Array()
    this.productService.getProducts().subscribe(
      res => {
        JSON.parse(res.toString()).forEach((element: Product) => {
          this.products.push(element)
        });
        this.dataSource = new MatTableDataSource(this.products)
        this.dataSource.paginator = this.paginator
      }
    )

  }

  public getRecord(id: number) {
    this.productService.getProductById(id).subscribe(
      res => {
        this.row = JSON.parse(res.toString())
        this.getImage(id)
        this.form = new FormGroup({
          name: new FormControl(this.row.name, [Validators.required]),
          image: new FormControl("", [Validators.required]),
          price: new FormControl(this.row.price, [Validators.required]),
          quantity: new FormControl(this.row.quantity, [Validators.required]),
          category: new FormControl(this.row.category, [Validators.required]),
          offer: new FormControl(this.row.offer, [Validators.required]),
          description: new FormControl(this.row.description, [Validators.required]),
        })
        this.isSelectedRow = true
      }
    )

  }

  public applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public selectFile(event: any): void {

    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.preview = e.target.result;
        };

        // change name of image in row to use it when you edit product in dataBase
        this.row.image = file.name
        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  public uploadImag() {
    if (this.currentFile) {
      var data = new FormData()
      data.append("file", this.currentFile)
      this.productService.uploads(data).subscribe(
        res => console.log(res)
      )
    }
  }

  public getImage(id: number) {
    this.productService.download(id).subscribe(
      blob => {

        // transformed blob to a image 
        var path: any = ""
        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
          path = reader.result;
        }

        // settiout to await the accomplished transformation
        setTimeout(
          () => {
            this.preview = path
          }
          , 50
        )
      }
    )
  }

  public deleteProduct() {
    this.productService.delete(this.row.id).subscribe(
      () => this.getAllProduct()
    )
    this.preview = "https://cdn-icons-png.flaticon.com/512/57/57165.png"
    this.isSelectedRow = false

  }

  public editProduct(): void {
    var data = this.form.value
    var product = new Product(data.name!, data.description!, data.category!, +data.offer!, +data.quantity!, +data.price!, this.row.image!, this.row.id)
    this.productService.edit(product).subscribe(
      () => {
        this.getAllProduct()
        this.uploadImag()
      }
    )
    this.preview = "https://cdn-icons-png.flaticon.com/512/57/57165.png"
    this.isSelectedRow = false
  }

}


