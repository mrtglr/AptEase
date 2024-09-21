import { Component, OnInit } from '@angular/core';
import { ChatService, MessageDto } from '../../../@core/shared/chat.service';
import { HelperService } from '../../../@core/helper/helper.service';

@Component({
  selector: 'ngx-public-chat',
  templateUrl: './public-chat.component.html',
  styleUrls: ['./public-chat.component.scss']
})
export class PublicChatComponent implements OnInit {

  constructor(private chatService: ChatService, private helper: HelperService) { }

  msgInboxArray: MessageDto[] = [];
  msgDto: MessageDto = new MessageDto();

  ngOnInit(): void {
    this.chatService.getChatHistory().subscribe(
      res => {
        this.mapChatHistory(res);
      },
      err => {
        console.log(err);
      }
    );

    this.chatService.retrieveMappedObject().subscribe((receivedObj: MessageDto) => { this.addToInbox(receivedObj); });
  }

  sendMessage(event): void {
    if (this.msgDto) {
      this.msgDto.messageText = event.message;
      this.msgDto.messageDate = new Date();
      this.msgDto.reply = true;
      this.chatService.broadcastMessage(this.msgDto);
    }
  }

  addToInbox(obj: MessageDto) {

    let message = new MessageDto();
    message.applicationUserChatName = obj.applicationUserChatName;
    message.messageText = obj.messageText;
    message.messageDate = new Date();
    if (message.applicationUserChatName === this.helper.getAuthorizedUserChatName()) {
      message.reply = true
    } else {
      message.reply = false;
      let audio: HTMLAudioElement = new Audio('https://firebasestorage.googleapis.com/v0/b/img-str-demo.appspot.com/o/the-notification-email-143029.mp3?alt=media&token=c5c3af91-ed0a-4ca9-8012-8f7266149bc6');
      audio.play();
    }
    this.msgInboxArray.push(message);
  }

  mapChatHistory(dataSource: any) {
    let that = this;
    dataSource.forEach(element => {
      let message = new MessageDto();
      message.applicationUserChatName = element.applicationUserChatName;
      message.messageText = element.messageText;
      message.messageDate = element.messageDate;
      if (element.applicationUserChatName === that.helper.getAuthorizedUserChatName()) {
        message.reply = true
      } else {
        message.reply = false;
      }
      that.msgInboxArray.push(message);
    });
  }

}
