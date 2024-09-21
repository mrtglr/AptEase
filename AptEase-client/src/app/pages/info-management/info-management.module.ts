import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfoManagementRoutingModule } from './info-management-routing.module';
import { NotificationsListComponent } from './notification-list/notifications-list.component';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbInputModule, NbIconModule, NbSpinnerModule, NbButtonModule, NbSelectModule, NbCheckboxModule, NbListModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  declarations: [
    NotificationsListComponent,
  ],
  imports: [
    CommonModule,
    InfoManagementRoutingModule,
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
    NbCheckboxModule,
    NbListModule
  ]
})
export class InfoManagementModule { }
