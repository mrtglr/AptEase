import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillListComponent } from './bill-list/bill-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'my-bills',
    pathMatch: 'full',
  },
  {
    path: 'my-bills',
    component: BillListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillManagementRoutingModule { }

export const routedComponents = [
  BillListComponent
];
