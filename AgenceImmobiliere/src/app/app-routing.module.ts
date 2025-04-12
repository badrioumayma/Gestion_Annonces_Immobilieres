import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManagePropertiesComponent } from './manage-properties/manage-properties.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'admin/dashboard', component: DashboardComponent },
  { path: 'admin/manage-properties', component: ManagePropertiesComponent },
  { path: '', redirectTo: '/admin/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
