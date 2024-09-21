import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { PublicChatComponent } from './public-chat/public-chat.component';
import { NbButtonModule, NbCardModule, NbChatModule, NbCheckboxModule, NbIconModule, NbInputModule, NbSelectModule, NbSpinnerModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  declarations: [
    PublicChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    NbChatModule,
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
export class ChatModule { }
