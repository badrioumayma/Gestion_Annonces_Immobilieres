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


import { PropertyListComponent } from './property-list/property-list.component';
import { VisiteRequestsComponent } from './visite-requests/visite-requests.component';

const routes: Routes = [
  // Routes sans layout (pas de navbar ni footer)
  { path: 'login', component: LoginComponent },

  // Routes publiques (avec navbar et footer)
  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: WelcomePageComponent },
      
      { path: 'property/:id', component: PropertyDetailsComponent },
      
    ]
  },
  
  // Routes admin (avec sidebar)
  {
    path: 'admin',
    component: AdminLayoutComponent,
    
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'add-property', component: AddpropertyComponent },
      { path: 'properties', component: PropertyListComponent },
      { path: 'property-form/:id', component: AddpropertyComponent },
      { path: 'visite-requests', component: VisiteRequestsComponent },
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
