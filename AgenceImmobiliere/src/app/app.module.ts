import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CardComponent } from './card/card.component';
import { TableComponent } from './table/table.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PropertyCardComponent } from './property-card/property-card.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { ContactInfoComponent } from './contact-info/contact-info.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './shared/modal/modal.component';
import { AddpropertyComponent } from './addproperty/addproperty.component';
import { LoginComponent } from './login/login.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PropertyListComponent } from './property-list/property-list.component';
import { VisiteRequestsComponent } from './visite-requests/visite-requests.component';
import { VisiteRequestService } from './services/visite-request.service';

@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    PublicLayoutComponent,
    AddpropertyComponent,
    DashboardComponent,
    SidebarComponent,
    CardComponent,
    TableComponent,
    WelcomePageComponent,
    NavbarComponent,
    PropertyCardComponent,
    ContactInfoComponent,
    PropertyDetailsComponent,
    ModalComponent,
    LoginComponent,
    PropertyListComponent,
    VisiteRequestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [VisiteRequestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
