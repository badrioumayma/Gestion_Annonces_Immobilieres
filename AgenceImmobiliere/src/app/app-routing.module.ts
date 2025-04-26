import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { AddpropertyComponent } from './addproperty/addproperty.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import { PropertyListComponent } from './property-list/property-list.component';

const routes: Routes = [
  // Routes sans layout (pas de navbar ni footer)
  { path: 'login', component: LoginComponent },
  { 
    path: 'profile', 
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  
  // Routes publiques (avec navbar et footer)
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: WelcomePageComponent },
      { path: 'property/:id', component: PropertyDetailsComponent },
      { path: 'contact', component: ContactComponent }
    ]
  },
  
  // Routes admin (avec sidebar)
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'add-property', component: AddpropertyComponent },
      { path: 'properties', component: PropertyListComponent },
      { path: 'property-form/:id', component: AddpropertyComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
