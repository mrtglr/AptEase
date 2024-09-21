import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class InfoService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getNotifications() {
    return this.http.get<any[]>(this.baseUrl + '/Notification/getNotificationsForUser');
  }

  setNotificationReaded(notification: any) {
    return this.http.post<any[]>(this.baseUrl + '/Notification/setNotificationReaded', notification);
  }
}
