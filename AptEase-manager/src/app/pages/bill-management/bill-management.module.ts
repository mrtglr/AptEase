import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BillListComponent } from './bill-list/bill-list.component';

import { FormsModule } from '@angular/forms';
import { NbCardModule, NbInputModule, NbIconModule, NbSpinnerModule, NbButtonModule, NbSelectModule, NbCheckboxModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { BillManagementRoutingModule } from './bill-management-routing.module';
import { TransectionListComponent } from './transection-list/transection-list.component';


@NgModule({
  declarations: [
    BillListComponent,
    TransectionListComponent,
  ],
  imports: [
    CommonModule,
    BillManagementRoutingModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbInputModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    NbSpinnerModule,
    NbButtonModule,
    FormsModule,
    NbSelectModule,
    NbCheckboxModule
  ]
})
export class BillManagementModule { }
