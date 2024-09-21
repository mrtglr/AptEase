import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicChatComponent } from './public-chat/public-chat.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'public-chat',
    pathMatch: 'full',
  },
  {
    path: 'public-chat',
    component: PublicChatComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
