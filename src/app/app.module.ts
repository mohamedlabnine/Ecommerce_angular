import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './product/product.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddProductComponent } from './add-product/add-product.component';
import { OrderComponent } from './order/order.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateStoreComponent } from './create-store/create-store.component';
import { HomeComponent } from './home/home.component';
import { AuthComponent } from './auth/auth.component';
import { MatTabsModule } from '@angular/material/tabs';
import { CategoryComponent } from './category/category.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { LoadingInterceptor } from './security/loading.interceptor';
import { MatMenuModule } from '@angular/material/menu';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    ProductComponent,
    AddProductComponent,
    OrderComponent,
    CreateStoreComponent,
    HomeComponent,
    AuthComponent,
    CategoryComponent,
    ViewProductComponent,
    PageNotFoundComponent,
    SpinnerComponent,
    CartComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatMenuModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
