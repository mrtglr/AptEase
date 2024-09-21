import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditUserProfileComponent } from './edit-user-profile/edit-user-profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'edit-user-profile',
    pathMatch: 'full',
  },
  {
    path: 'edit-user-profile',
    component: EditUserProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileManagementRoutingModule { }

export const routedComponents = [
  EditUserProfileComponent,
];
