import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { ContactComponent } from './components/contact/contact.component';
import{KeycloakAngularModule,KeycloakService} from 'keycloak-angular';
import { AdminComponent } from './components/admin/admin.component';


function initializeKeycloak(keycloak:KeycloakService){
  return()=>
    keycloak.init({
      config:{
        url: 'http://localhost:8180/',
        realm:'e-commerce',
        clientId:'e-commerce-pkce'
      },
      initOptions:{
        pkceMethod:'S256',
        redirectUri:'http://localhost:4200/products'
      },loadUserProfileAtStartUp: false
    })


}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    SignupComponent,
    ProductsComponent,
    CartComponent,
    ContactComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    KeycloakAngularModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi:true,
      deps:[KeycloakService],
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
