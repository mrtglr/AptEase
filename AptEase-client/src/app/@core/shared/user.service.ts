import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService {

  constructor(private http: HttpClient) { 
    super();
  }

  getCurrentUser() {
    return this.http.get<any[]>(this.baseUrl+'/User/user');
  }

  getUser(user_id: string) {
    return this.http.get<any[]>(this.baseUrl+'/User/getUser?user_id=' + user_id);
  }

  getUsers() {
    return this.http.get<any[]>(this.baseUrl+'/User/list');
  }

  updateUser(user: any) {
    return this.http.put<any[]>(this.baseUrl+'/User/updateUser', user);
  }

  updateUserPassword(passwordUpdateModel: any, ) {
    return this.http.put<any[]>(this.baseUrl+'/User/updatePassword', passwordUpdateModel);
  }

    updateUserSession() {
    return this.http.get<any[]>(this.baseUrl+'/User/updateUserSession');
  }
}
