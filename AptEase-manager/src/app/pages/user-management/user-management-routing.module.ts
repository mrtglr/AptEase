import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRegisterComponent } from './user-register/user-register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'user-list',
    pathMatch: 'full',
  },
  {
    path: 'user-list',
    component: UserListComponent,
  },
  {
    path: 'user-detail',
    component: UserDetailComponent,
  },
  {
    path: 'user-register',
    component: UserRegisterComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }

export const routedComponents = [
  UserListComponent,
  UserDetailComponent,
  UserRegisterComponent
];
