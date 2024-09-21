import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BaseService } from './base.service';

export class MessageDto {
  public applicationUserChatName: string = '';
  public messageText: string = '';
  public reply: boolean = false;
  public messageDate: Date = new Date(0);
}

@Injectable({
  providedIn: 'root'
})
export class ChatService extends BaseService {

  private connection: any = new signalR.HubConnectionBuilder()
    .configureLogging(signalR.LogLevel.Trace)
    .withUrl(environment.hubURL)
    .build();

  readonly POST_URL = environment.broadcastURL;

  private receivedMessageObject: MessageDto = new MessageDto();
  private sharedObj = new Subject<MessageDto>();

  constructor(private http: HttpClient) {
    super();
    this.connection.onclose(async () => {
      await this.start();
    });
    this.connection.on("ReceiveOne", (user: any, message: any, reply: any, date: Date) => { this.mapReceivedMessage(user, message, reply, date); });
    this.start();
  }

  public async start() {
    try {
      Object.defineProperty(WebSocket, 'OPEN', { value: 1, });
      this.connection
        .start()
        .then(() => {
          console.log('Connection started!');
        })
        .catch(err => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    }
  }

  private mapReceivedMessage(user: string, message: string, reply: boolean, date: Date): void {
    this.receivedMessageObject.applicationUserChatName = user;
    this.receivedMessageObject.messageText = message;
    this.receivedMessageObject.reply = reply;
    this.receivedMessageObject.messageDate = date;
    this.sharedObj.next(this.receivedMessageObject);
  }

  // End points

  public broadcastMessage(msgDto: any) {
    this.http.post(this.POST_URL, msgDto).subscribe(data => console.log(data));
  }

  public getChatHistory() {
    return this.http.get<any[]>(this.baseUrl + '/Chat/getChatHistory');
  }

  public retrieveMappedObject(): Observable<MessageDto> {
    return this.sharedObj.asObservable();
  }
}
