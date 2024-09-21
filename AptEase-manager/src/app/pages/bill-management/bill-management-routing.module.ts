import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillListComponent } from './bill-list/bill-list.component';
import { TransectionListComponent } from './transection-list/transection-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'bill-list',
    pathMatch: 'full',
  },
  {
    path: 'bill-list',
    component: BillListComponent,
  },
  {
    path: 'transection-list',
    component: TransectionListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillManagementRoutingModule { }

export const routedComponents = [
  BillListComponent,
  TransectionListComponent
];