import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePropertiesComponent } from './manage-properties/manage-properties.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { PropertyDetailsComponent } from './property-details/property-details.component';

const routes: Routes = [
  { path: '', component: WelcomePageComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'manage-properties', component: ManagePropertiesComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: 'property/:id', component: PropertyDetailsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
