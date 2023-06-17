import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '../Model/order';
import { Product } from '../Model/product';
import { OrderService } from '../serveice/order.service';
import { ProductServiceService } from '../serveice/product-service.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {

  public displayedColumns: string[] = ['id', 'customer_id', 'date', 'address']
  public columnsproducts: string[] = ['image', 'name', 'quantity', 'price']
  public dataSource!: MatTableDataSource<Order>;
  public products!: MatTableDataSource<Product>;
  public isSelectedRow = false
  public orders!: Array<Order>
  public amount = 0

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private orderService: OrderService, private productService: ProductServiceService) { }

  ngOnInit(): void {
    this.getAllOrders()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getRecord(row: any) {
    this.amount = 0
    row.products.forEach((element: Product) => {
      this.getImage(element)
      this.amount += element.quantity * element.price
    })

    this.products = new MatTableDataSource(row.products)
    this.isSelectedRow = true

  }

  getAllOrders() {
    this.orders = new Array()
    this.orderService.getAllOrders().subscribe(
      res => {
        JSON.parse(res.toString()).forEach((element: Order) => {
          this.orders.push(element)
        })

        this.dataSource = new MatTableDataSource(this.orders)
        this.dataSource.paginator = this.paginator

      }
    )


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

}




