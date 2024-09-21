import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillRulesComponent } from './bill-rules/bill-rules.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bill-payment-rule',
    pathMatch: 'full',
  },
  {
    path: 'bill-payment-rule',
    component: BillRulesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartmentManagementRoutingModule { }
