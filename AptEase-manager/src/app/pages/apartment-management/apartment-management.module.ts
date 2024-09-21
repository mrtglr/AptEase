import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartmentManagementRoutingModule } from './apartment-management-routing.module';
import { BillRulesComponent } from './bill-rules/bill-rules.component';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbInputModule, NbIconModule, NbSpinnerModule, NbButtonModule, NbSelectModule, NbCheckboxModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';


@NgModule({
  declarations: [
    BillRulesComponent
  ],
  imports: [
    CommonModule,
    ApartmentManagementRoutingModule,
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
export class ApartmentManagementModule { }
