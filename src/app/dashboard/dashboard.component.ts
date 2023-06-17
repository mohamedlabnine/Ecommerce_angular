import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { CustomerService } from '../serveice/customer.service';
import { StoreService } from '../serveice/store.service';
import { ModelLearningService } from '../serveice/model-learning.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  public chart: any
  public number_Store = 0
  public number_Customer = 0
  public earning: Array<number> = new Array()
  public dates: Array<number> = new Array()
  public stock = new Array()
  public temp = 12
  public hum = 12

  constructor(private modelService: ModelLearningService, private storeservice: StoreService, private Customerservice: CustomerService) { }

  ngOnInit(): void {
    this.getNumberOfStores()
    this.getNumberOfCustomers()
    this.getData()
    this.modelService.get_Last_Mesure().subscribe(
      res => {
        if (res.feeds[0].field3 != null) {
          this.temp = res.feeds[0].field3
        }

        if (res.feeds[0].field2 != null) {
          this.hum = res.feeds[0].field2
        }
        this.stock.push((res.feeds[0].field1 * 100) / 466 + "%")
        this.stock.push((res.feeds[0].field4 * 100) / 466 + "%")
        this.stock.push((res.feeds[0].field5 * 100) / 466 + "%")
        this.stock.push((res.feeds[0].field6 * 100) / 466 + "%")

      }
    )
  }

  getData() {
    this.modelService.getEarning().subscribe(
      res => {
        (JSON.parse(res[0]) as Array<any>).forEach(
          item => this.earning.push(item)
        );

        (JSON.parse(res[1]) as Array<any>).forEach(
          item => this.dates.push(item)
        );

        this.createChart()

      }
    )
  }

  createChart() {
    this.chart = new Chart("MyChart", {
      type: 'line',

      data: {
        labels: this.dates,
        datasets: [
          {
            label: "Sales",
            data: this.earning,
            backgroundColor: 'blue'
          },

        ]
      },
      options: {
        aspectRatio: 2.5
      }

    });
  }


  public getNumberOfStores() {
    this.storeservice.getNumberOfStores().subscribe(
      res => this.number_Store = res as number
    )
  }

  public getNumberOfCustomers() {
    return this.Customerservice.getNumberOfCustomers().subscribe(
      res => this.number_Customer = res as number
    )
  }


}
