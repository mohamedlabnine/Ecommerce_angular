import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AuthComponent } from './auth/auth.component';
import { CategoryComponent } from './category/category.component';
import { CreateStoreComponent } from './create-store/create-store.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { Product } from './Model/product';
import { OrderComponent } from './order/order.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductComponent } from './product/product.component';
import { AuthGuard } from './security/auth.guard';
import { ViewProductComponent } from './view-product/view-product.component';
import { PaymentComponent } from './payment/payment.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "auth", component: AuthComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "products", component: ProductComponent, canActivate: [AuthGuard] },
  { path: "addproduct", component: AddProductComponent, canActivate: [AuthGuard] },
  { path: "order", component: OrderComponent, canActivate: [AuthGuard] },
  { path: "store", component: CreateStoreComponent, canActivate: [AuthGuard] },
  { path: "category", component: CategoryComponent, canActivate: [AuthGuard] },
  { path: "category/:kind", component: CategoryComponent, canActivate: [AuthGuard] },
  { path: "view", component: ViewProductComponent, canActivate: [AuthGuard] },
  { path: "payment", component: PaymentComponent, canActivate: [AuthGuard] },
  { path: "**", component: PageNotFoundComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
