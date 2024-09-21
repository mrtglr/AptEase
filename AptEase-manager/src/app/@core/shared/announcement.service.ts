import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementService extends BaseService {

  constructor(private http: HttpClient) {
    super();
  }

  getAnnouncements() {
    return this.http.get<any[]>(this.baseUrl + '/Announcement/list');
  }

  createAnnouncement(announcement: any) {
    return this.http.post<any[]>(this.baseUrl + '/Announcement/createAnnouncement', announcement);
  }

  deleteAnnouncement(announcement_id: any) {
    return this.http.delete<any[]>(this.baseUrl + '/Announcement/deleteAnnouncement?announcement_id=' + announcement_id);
  }

}
