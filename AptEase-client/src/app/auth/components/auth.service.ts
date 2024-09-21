import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from '../../@core/shared/base.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  UserToken: any = { 
    'name': '', 
    'date': '', 
    'value': '' 
  };

  constructor(private http: HttpClient) { 
    super();
  }

  login(formData: any) {
    return this.http.post(this.baseUrl + '/Login', formData);
  }

  logout(router: any) {
    localStorage.clear();
    router.navigateByUrl('/login');
  }

  destroyUserToken() {
    this.UserToken.name = '';
    this.UserToken.date = '';
    this.UserToken.value = '';
  }
}