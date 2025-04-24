import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CardComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PropertyCardComponent } from './property-card/property-card.component';
import { FooterComponent } from './footer/footer.component';
import { ContactComponent } from './contact/contact.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './shared/modal/modal.component';
import { AddpropertyComponent } from './addproperty/addproperty.component';
import { LoginComponent } from './login/login.component';
@NgModule({
  declarations: [
    AppComponent,
    AddpropertyComponent,
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    CardComponent,
    TableComponent,
    WelcomePageComponent,
    NavbarComponent,
    PropertyCardComponent,
    FooterComponent,
    ContactComponent,
    ContactInfoComponent,
    PropertyDetailsComponent,
    ModalComponent,
    LoginComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
