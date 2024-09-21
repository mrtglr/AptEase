import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { NbCardModule, NbInputModule, NbIconModule, NbSpinnerModule, NbButtonModule, NbSelectModule, NbCheckboxModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent,
    UserRegisterComponent
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
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
export class UserManagementModule { }
