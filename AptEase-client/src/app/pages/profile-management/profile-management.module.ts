import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileManagementRoutingModule } from './profile-management-routing.module';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';
import { FormsModule } from '@angular/forms';
import { NbCardModule, NbInputModule, NbIconModule, NbSpinnerModule, NbButtonModule, NbSelectModule, NbCheckboxModule, NbTooltipModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';


@NgModule({
  declarations: [
    EditUserProfileComponent
  ],
  imports: [
    CommonModule,
    ProfileManagementRoutingModule,
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
    NbTooltipModule,
  ]
})
export class ProfileManagementModule { }
