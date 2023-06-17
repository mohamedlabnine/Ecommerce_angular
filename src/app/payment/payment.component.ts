import { Component, OnInit } from '@angular/core';
import { render } from 'creditcardpayments/creditCardPayments';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor() {
    render(
      {
        id: "#payments",
        currency: "USD",
        value: "100.00",
        onApprove: (details) => {

        }
      }
    );
  }

  ngOnInit(): void {
  }

  saveData() {
    console.info("clicked")
  }

}
