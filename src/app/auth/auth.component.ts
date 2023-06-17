import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../Model/customer';
import { Login } from '../Model/login';
import { Response } from '../Model/response';
import { ResponseLogin } from '../Model/response-login';
import { CustomerService } from '../serveice/customer.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  //form of login
  form_login = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  })

  //form of registration
  form_registre = new FormGroup({
    firstname: new FormControl("", Validators.required),
    lastname: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    repeat_password: new FormControl("", Validators.required),
  })

  form_forget_password = new FormGroup({
    email: new FormControl()
  })

  valid_email_password = true
  email_already_exist = false
  match_password = true


  constructor(private authservice: CustomerService, private rout: Router) { }

  ngOnInit(): void {
  }



  login(): void {
    var login = new Login(this.form_login.value.email!, this.form_login.value.password!)
    this.authservice.login(login).subscribe(
      response => this.login_verification(response as ResponseLogin)
    )

  }

  login_verification(response: ResponseLogin) {
    if (response.status == 404) {
      this.valid_email_password = false
    }
    else {
      localStorage.setItem('token', response.jwt)
      localStorage.setItem("id", response.id.toString())
      localStorage.setItem("role", response.role)
      localStorage.setItem("id_store", response.id_store.toString())

      this.valid_email_password = true
      this.rout.navigate(['']).then(() => {
        window.location.reload()
      });

    }
  }

  registre(): void {
    var firstname = this.form_registre.value.firstname
    var lastname = this.form_registre.value.lastname
    var email = this.form_registre.value.email
    var password = this.form_registre.value.password
    var repeat_password = this.form_registre.value.repeat_password
    if (password == repeat_password) {
      var customer = new Customer(firstname!, lastname!, email!, password!)
      this.authservice.register(customer).subscribe(
        res => {
          this.registerVerification(res as unknown as Response)
        }
      )
    }
    else {
      this.match_password = false
    }

  }

  registerVerification(res: Response) {
    if (res.status == 201) {
      this.email_already_exist = false
      this.rout.navigate(['auth']).then(() => {
        window.location.reload()
      });
    } else {
      this.email_already_exist = true
    }
  }


  dismiss_error() {
    this.valid_email_password = true
    this.match_password = true
    this.email_already_exist = false
  }


}
