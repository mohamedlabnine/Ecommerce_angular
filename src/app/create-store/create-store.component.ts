import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateStore } from '../Model/create-store';
import { Response } from '../Model/response';
import { StoreService } from '../serveice/store.service';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css']
})
export class CreateStoreComponent implements OnInit {

  public form_Store = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.email]),
    email: new FormControl("", Validators.required),
    code: new FormControl("", Validators.required)
  })

  public isNotEnterEmail = true
  public code_correct = true

  constructor(private storeService: StoreService, private route: Router) { }

  ngOnInit(): void {
  }

  public sendEmailVerification() {
    this.storeService.sendEmailVerification(this.form_Store.value.email!).subscribe(
      res => console.log(res)
    )
    this.isNotEnterEmail = false
  }

  public createStore() {
    var data = this.form_Store.value
    var createStore = new CreateStore(data.name!, data.email!, data.code!)
    this.storeService.createStore(createStore).subscribe(
      res => {
        if ((JSON.parse(res) as Response).status == 200) {
          localStorage.setItem("role", "[Customer]")
          this.route.navigate(["products"])
        }
        else {
          this.code_correct = false
        }
      }
    )
  }

}
