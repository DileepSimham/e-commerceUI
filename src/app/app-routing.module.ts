import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { AuthKeyClockGuard } from './components/routeguards/auth.route';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin', component: AdminComponent, canActivate: [AuthKeyClockGuard], data: {
      roles: ['USER', 'ADMIN']
    }
  },
  {
    path: 'cart', component: CartComponent, canActivate: [AuthKeyClockGuard], data: {
      roles: ['USER','ADMIN']
    }
  },
  {
    path: 'products', component: ProductsComponent, canActivate: [AuthKeyClockGuard], data: {
      roles: ['USER']
    }
  },

  {
    path: 'contact', component: ContactComponent, canActivate: [AuthKeyClockGuard], data: {
      roles: ['USER']
    }
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
